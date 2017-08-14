import React, {Component} from 'react';
import api from '../../api';
import BoardCard from '../elements/BoardCard';
import AddButton from '../elements/AddButton';
import auth from '../../auth';
import './Home.css';
import EditButton from '../elements/EditButton';
import EditBoard from '../modals/EditBoard';
import CreateBoard from "../modals/CreateBoard";
import DeleteButton from "../elements/DeleteButton";
import DeleteBoard from "../modals/DeleteBoard";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: [],
      isEditBoardOpen: false,
      editingBoardID: "",
      isCreateBoardOpen: false,
      isDeleteBoardOpen: false,
      isBoardChanged: false
    };
  }

  componentDidMount() {
    this._fetchBoards();
    this._fetchCurrentUser();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isBoardChanged !== prevState.isBoardChanged) {
      this._fetchBoards();
    }
  }


  shouldComponentUpdate(nextProps, nextState) { //same type of logic as App.js but need more initial checks for fetch board and user
    console.log("SCU Home.js");
    if (this.props.logOutProp !== nextProps.logOutProp){
      return true;
    }
    if (this.state.boards !== nextState.boards){
      return true;
    }
    if (this.state.userId !== nextState.userId){
      return true;
    }
    if (this.state.isBoardChanged !== nextState.isBoardChanged){
      return true;
    }
    if (this.state.isEditBoardOpen === nextState.isEditBoardOpen) {
      if (this.state.isCreateBoardOpen === nextState.isCreateBoardOpen){
        if (this.state.isDeleteBoardOpen === nextState.isDeleteBoardOpen){
          return false;
        }
        return true;
      }
      return true;
    }
    return true;
  }

  _fetchBoards = () => {
    api.getBoardsList()
      .then(res => {
        this.setState({boards: res.body.boards});
      })
      .catch(console.error);
  };

  _fetchCurrentUser() {
    auth.getCurrentLoggedInUser(auth.getToken())
      .then(res => {
        this.setState({userId: res.body.id /*5*/}); //TODO: for testing on apiary we use "5"
      });
  }

  editBoard = (editOrNot) => {
    this.setState({isEditBoardOpen: false});
    if (editOrNot) {
      this.setState({isBoardChanged: !this.state.isBoardChanged});
    }
  };
  closeCreateBoard = () => this.setState({isCreateBoardOpen: false});

  closeDeleteBoard = (deleteOrNot) => {
    this.setState({isDeleteBoardOpen: false});
    if (deleteOrNot) {
      this.setState({isBoardChanged: !this.state.isBoardChanged});
    }
  };

  render() {
    console.log("HOME RENDERED");
    let {boards} = this.state;
    return (
      <div className="home">
        {boards.map(b =>
          <div className="board-card-list" key={b.id}>
            <BoardCard
              id={b.id}
              title={b.title}
              description={b.description}
              updatedAt={b.updatedAt}
            />
            {b.ownerId === this.state.userId && auth.isLoggedIn() && this.props.logOutProp ? // need second expression in conditional to validate if user logged out on home page!
              <div>
                <EditButton onClick={() => this.setState({isEditBoardOpen: !this.state.isEditBoardOpen, editingBoardID: b.id})}/>
                <DeleteButton
                  onClick={() => this.setState({isDeleteBoardOpen: !this.state.isDeleteBoardOpen, deletingBoardID: b.id, deleteTitle: b.title})}/>
              </div> : ""}
          </div>
        )}
        <EditBoard show={this.state.isEditBoardOpen} closeEditBoard={this.editBoard}
                   editBoardId={this.state.editingBoardID} /*We need to the editBoardId state to be transferred from the onClick event, namely as each onClick will be dynamically generated*/ />
        {auth.isLoggedIn() ?
          <div>
            <AddButton onClick={() => this.setState({isCreateBoardOpen: !this.state.isCreateBoardOpen})}/>
            <CreateBoard show={this.state.isCreateBoardOpen} closeCreateBoard={this.closeCreateBoard}/>
            <DeleteBoard show={this.state.isDeleteBoardOpen} closeDeleteBoard={this.closeDeleteBoard} deleteBoardId={this.state.deletingBoardID} deleteTitle={this.state.deleteTitle}/>
          </div>
           : ""}
      </div>
    );
  }

}

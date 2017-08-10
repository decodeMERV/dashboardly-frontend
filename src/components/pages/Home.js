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
      isDeleteBoardOpen: false
    };
  }

  componentDidMount() {
    this._fetchBoards();
    this._fetchCurrentUser();
  }

  _fetchBoards = () => {
    api.getBoardsList()
    .then(res => {
      this.setState({ boards: res.body.boards })
    })
    .catch(console.error)
  }

  _fetchCurrentUser(){
    auth.getCurrentLoggedInUser()
      .then( res => {
        this.setState({ userId: res.body.id /*5*/ }) //TODO: for testing on apiary we use "5"
      })
  }

  editBoard = () => this.setState({ isEditBoardOpen: false });

  closeCreateBoard = () => this.setState({ isCreateBoardOpen: false });

  closeDeleteBoard = () => this.setState({ isDeleteBoardOpen: false });

  render() {
    let { boards } = this.state
    return (
      <div className="home">
        { boards.map(b =>
          <div className="board-card-list" key={b.id}>
            <BoardCard
              id={b.id}
              title={b.title}
              description={b.description}
              updatedAt={b.updatedAt}
            />
            {b.ownerId === this.state.userId ?
              <div>
                <EditButton onClick={ () => this.setState({ isEditBoardOpen : !this.state.isEditBoardOpen, editingBoardID : b.id}) } />
                <DeleteButton onClick={ () => this.setState({ isDeleteBoardOpen : !this.state.isDeleteBoardOpen, deletingBoardID : b.id, deleteTitle : b.title })}/>
              </div> : ""}
          </div>
        )}
        <EditBoard show={this.state.isEditBoardOpen} closeEditBoard={this.editBoard} editBoardId={this.state.editingBoardID} /*We need to the editBoardId state to be transferred from the onClick event, namely as each onClick will be dynamically generated*/ />
        {auth.isLoggedIn() ? <AddButton onClick={ ()=>this.setState({ isCreateBoardOpen : !this.state.isCreateBoardOpen }) } /> : null}
        <CreateBoard show={this.state.isCreateBoardOpen} closeCreateBoard={ this.closeCreateBoard } />
        <DeleteBoard show={this.state.isDeleteBoardOpen} closeDeleteBoard={this.closeDeleteBoard} deleteBoardId={this.state.deletingBoardID} deleteTitle={this.state.deleteTitle}/>
      </div>
    );
  }

}

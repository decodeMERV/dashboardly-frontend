import React, {Component} from 'react';
import api from '../../api';
import BoardCard from '../elements/BoardCard';
import AddButton from '../elements/AddButton';
import auth from '../../auth';
import './Home.css';
import EditButton from '../elements/EditButton';
import EditBoard from '../modals/EditBoard';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: [],
      isEditBoardOpen: false,
      editingBoardID: ""
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

  render() { //Note that I changed the key from the BoardCard to the div above it
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
            {b.ownerId === this.state.userId ? <EditButton onClick={ () => this.setState({ isEditBoardOpen : !this.state.isEditBoardOpen, editingBoardID : b.id}) } /> : ""}
          </div>
        )}
        <EditBoard show={this.state.isEditBoardOpen} closeEditBoard={this.editBoard} editBoardId={this.state.editingBoardID} /*We need to the editBoardId state to be transferred from the onClick event, namely as each onClick will be dynamically generated*/ />
        {auth.isLoggedIn() ? <AddButton /> : null}
      </div>
    );
  }

}

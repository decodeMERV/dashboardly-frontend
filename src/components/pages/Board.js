import React, {Component} from 'react';
import api from '../../api';
import auth from '../../auth';
import BookmarkCard from '../elements/BookmarkCard';
import AddButton from '../elements/AddButton';
import CreateBookmark from '../modals/CreateBookmark';
import './Board.css';
import EditButton from '../elements/EditButton';
import EditBookmark from '../modals/EditBookmark';
import DeleteButton from '../elements/DeleteButton';
import DeleteBookmark from '../modals/DeleteBookmark';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      bookmarks: [],
      updatedAt: "",
      isEditBookmarkOpen: false,
      userId: "",
      isCreateBookmarkOpen: false,
      isDeleteBookmarkOpen: false
    };
  }

  componentDidMount() {
    this.fetchBoardData()
  }

  fetchBoardData = () => {
      Promise.all([
        api.getBoard(this.props.params.id),
        api.getBookmarks(this.props.params.id),
        // auth.getCurrentLoggedInUser()
      ])
      .then(res => {
        console.log("ASDSDA");
        this.setState({
          title: res[0].body.title,
          description: res[0].body.description,
          bookmarks: res[1].body.bookmarks,
          // userId: res[2].body.id,
          // ownerId:res[0].body.ownerId
        })
        if (res[2].body.id === res[0].body.ownerId /*123*/){ //TODO: 123 is testing with apiary
          this.setState( {userOwns: true} );
        }
      })
      .catch( error => {
        console.log("Error!", error);
      })
  }

  handleClickOutside = (e) => {
    this.setState({
        isCreateBookmarkOpen: false
    })
  }

  editBookmark = () => this.setState ({isEditBookmarkOpen : false});

  closeDeleteBookmark = () => this.setState ({isDeleteBookmarkOpen : false});

  render() {
    let { bookmarks } = this.state

    return (
    <div className="main">
      <div className="board">
        { bookmarks.map(b =>
          <div className="bookmark-list" key={b.id}>
            <BookmarkCard
              id={b.id}
              title={b.title}
              description={b.description}
              url={b.url}
            />
            {this.state.userOwns ?
              <div>
                <EditButton onClick={ () => this.setState({ isEditBookmarkOpen : !this.state.isEditBookmarkOpen,  theBoardId : b.boardId}) } />
                <DeleteButton onClick={ () => this.setState({
                  isDeleteBookmarkOpen : !this.state.isDeleteBookmarkOpen,
                  deleteBookmarkTitle : b.title,
                  deleteBookmarkId : b.id,
                  deleteBookmarkBoardId : b.boardId
                })}/>
              </div>
              : ""}
          </div>
        )}
        <EditBookmark show={this.state.isEditBookmarkOpen} closeEditBookmark={this.editBookmark} editBoardId={this.state.theBoardId} />
      </div>
      <div >
        {this.state.userId === this.state.ownerId ?
              <AddButton onClick={()=>this.setState({isCreateBookmarkOpen: !this.state.isCreateBookmarkOpen})}/>
        : null }
        <CreateBookmark closeBookmark={this.handleClickOutside} show={this.state.isCreateBookmarkOpen}/>
        <DeleteBookmark closeDeleteBookmark={this.closeDeleteBookmark} show={this.state.isDeleteBookmarkOpen} deleteBMTitle={this.state.deleteBookmarkTitle} deleteBMId={this.state.deleteBookmarkId} deleteBMBoardId={this.state.deleteBookmarkBoardId} />
      </div>
    </div>
    );
  }
}
export default Board;

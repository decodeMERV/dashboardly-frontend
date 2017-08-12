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
      bookmarks: [],
      isEditBookmarkOpen: false,
      userId: "",
      isCreateBookmarkOpen: false,
      isDeleteBookmarkOpen: false,
      isBookmarkChanged : false
    };
  }

  componentDidMount() {
    console.log("BOARD MOUNTED")
    this.fetchBoardData()
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("BOARD DIDUPDATE");
    if (this.state.isBookmarkChanged !== prevState.isBookmarkChanged){
      this.fetchBoardData();
    }
  }

  fetchBoardData = () => {
      Promise.all([
        api.getBoard(this.props.params.id),
        api.getBookmarks(this.props.params.id),
      ])
      .then(res => {
        this.setState({
          title: res[0].body.title,
          description: res[0].body.description,
          bookmarks: res[1].body.bookmarks,
          ownerId:res[0].body.ownerId
        })
      })
      .catch(error => {console.log("Error during loading bookmarks", error);})
      .then( () => { return auth.getCurrentLoggedInUser(auth.getToken()) } )
      .then(resAuth => {
        this.setState({ userId: resAuth.body.id});
        if (resAuth.body.id === this.state.ownerId /*123*/){ //TODO: 123 is testing with apiary
          this.setState( {userOwns: true} );
        }
      })
      .catch( error => {console.log("Error during loading user Authentication for bookmarks: ", error);})
  }

  createBookMark = (createOrNot) => {
    console.log("CREATEBM");
    this.setState({ isCreateBookmarkOpen: false });
    if (createOrNot){ this.setState ({isBookmarkChanged: !this.state.isBookmarkChanged}); }
  }

  editBookmark = (editOrNot) => {
    console.log("EDITBOOKMARK");
    this.setState ({isEditBookmarkOpen : false});
    if (editOrNot){ this.setState ({isBookmarkChanged: !this.state.isBookmarkChanged}); }
  }

  closeDeleteBookmark = (deleteOrNot) => {
    console.log("CLOSEDELETEBOOKMARK")
    this.setState ({isDeleteBookmarkOpen : false});
    if (deleteOrNot){ this.setState ({isBookmarkChanged: !this.state.isBookmarkChanged}); }
  };

  render() {
    console.log("RENDERED BOARD");
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
                <EditButton onClick={ () => this.setState({ isEditBookmarkOpen : !this.state.isEditBookmarkOpen,  theBMId : b.id, theBoardId : b.boardId}) } />
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
        {
          this.state.userOwns ?
            <div>
              <EditBookmark show={this.state.isEditBookmarkOpen} closeEditBookmark={this.editBookmark} editBookmarkId={this.state.theBMId} editBoardId={this.state.theBoardId} />
              <CreateBookmark closeCreateBookmark={this.createBookMark} show={this.state.isCreateBookmarkOpen}/>
              <DeleteBookmark closeDeleteBookmark={this.closeDeleteBookmark} show={this.state.isDeleteBookmarkOpen} deleteBMTitle={this.state.deleteBookmarkTitle} deleteBMId={this.state.deleteBookmarkId} deleteBMBoardId={this.state.deleteBookmarkBoardId} />
            </div>
            :""
        }
      </div>
      <div >
        {this.state.userId === this.state.ownerId ?
              <AddButton onClick={()=>this.setState({isCreateBookmarkOpen: !this.state.isCreateBookmarkOpen})}/>
        : null }
      </div>
    </div>
    );
  }
}
export default Board;

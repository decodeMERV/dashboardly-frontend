import React, {Component} from 'react';
import api from '../../api';
import auth from '../../auth';
import BookmarkCard from '../elements/BookmarkCard';
import AddButton from '../elements/AddButton';
import CreateBookmark from '../modals/CreateBookmark';
import './Board.css';
import EditButton from '../elements/EditButton';
import EditBookmark from '../modals/EditBookmark';

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
      isCreateBookmarkOpen: false
    };
  }

  componentDidMount() {
    this.fetchBoardData()
  }

  fetchBoardData = () => {
      Promise.all([
        api.getBoard(this.props.params.id),
        api.getBookmarks(this.props.params.id),
        auth.getCurrentLoggedInUser()
      ])
      .then(res => {
        this.setState({
          title: res[0].body.title,
          description: res[0].body.description,
          bookmarks: res[1].body.bookmarks,
          userId: res[2].body.id,
          ownerId:res[0].body.ownerId
        })
        if (res[2].body.id === res[0].body.ownerId /*123*/){ //TODO: 123 is testing with apiary
          this.setState( {userOwns: true} );
        }
      })
      .catch(console.error)
  }
  handleClickOutside = (e) => {
    this.setState({
        isCreateBookmarkOpen: false
    })
  }

  editBookmark = () => this.setState ({isEditBookmarkOpen : false});

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
            {this.state.userOwns ? <EditButton onClick={ () => this.setState({ isEditBookmarkOpen : !this.state.isEditBookmarkOpen,  theBoardId : b.boardId}) } /> : ""}
          </div>
        )}
        <EditBookmark show={this.state.isEditBookmarkOpen} closeEditBookmark={this.editBookmark} editBoardId={this.state.theBoardId} />
      </div>
      <div >
        {this.state.userId === this.state.ownerId ?
              <AddButton onClick={()=>this.setState({isCreateBookmarkOpen: !this.state.isCreateBookmarkOpen})}/>
        : null }
        <CreateBookmark closeBookmark={this.handleClickOutside} show={this.state.isCreateBookmarkOpen}/>
      </div>
    </div>
    );
  }
}
export default Board;

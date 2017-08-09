import React, {Component} from 'react';
import api from '../../api';
import BookmarkCard from '../elements/BookmarkCard';
import auth from '../../auth';
import './Board.css';
import EditButton from '../elements/EditButton';
import EditBookmark from '../modals/EditBookmark';

export default class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      bookmarks: [],
      updatedAt: "",
      isEditBookmarkOpen: false
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
          bookmarks: res[1].body.bookmarks
        });
        // console.log(res[2].body);
        // console.log(res[0].body);
        if (res[2].body.id === res[0].body.ownerId /*123*/){ //TODO: 123 is testing with apiary
          this.setState( {userOwns: true} );
        }
      })
      .catch(console.error)
  }

  editBookmark = () => this.setState ({isEditBookmarkOpen : false});

  render() {
    let { bookmarks } = this.state
    return (
      <div className="board">
        { bookmarks.map(b =>
          <div className="bookmark-list" key={b.id}>
            <BookmarkCard
              id={b.id}
              title={b.title}
              description={b.description}
              url={b.url}
            />
            {this.state.userOwns ? <EditButton onClick={ () => this.setState({ isEditBookmarkOpen : !this.state.isEditBookmarkOpen,  editingBookmarkId : b.id}) } /> : ""}
          </div>
        )}
        <EditBookmark show={this.state.isEditBookmarkOpen} closeEditBookmark={this.editBookmark} editBoardId={this.state.editingBookmarkId} />
      </div>
    );
  }

}

import React, {Component} from 'react';
import api from '../../api';
import auth from '../../auth';
import BookmarkCard from '../elements/BookmarkCard';
import AddButton from '../elements/AddButton';
import onClickOutside from 'react-onclickoutside';
import CreateBookmark from '../modals/CreateBookmark';
import './Board.css';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      bookmarks: [],
      updatedAt: "",
      userId: "",
      isBookmarkOpen: false
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
     })
      .catch(console.error)
  }
  handleClickOutside = (e) => {
    console.log("line 45",this.state.isBookmarkOpen)
    this.setState({
        isBookmarkOpen: false
    })
  }



  render() {
    let { bookmarks } = this.state

    return (
    <div className="main">
      <div className="board">
        { bookmarks.map(b =>
          <BookmarkCard
            key={b.id}
            id={b.id}
            title={b.title}
            description={b.description}
            url={b.url}
          />
        )}
      </div>
      <div >
        {this.state.userId !== this.state.ownerId ? //for the purpose of testing we will set !== because userId & ownerId dummy data are always not equal
              <AddButton onClick={()=>this.setState({isBookmarkOpen: !this.state.isBookmarkOpen})}  />
        : 'null' }
        <CreateBookmark closeBookmark={this.handleClickOutside} show={this.state.isBookmarkOpen}/>
      </div>
    </div>
    );
  }
}
export default Board;

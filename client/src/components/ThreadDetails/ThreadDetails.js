import React, { Component } from "react";
import Container from "../../components/Container";
import { defaults } from "../../assets/Defaults";
import AddCommentToThread from "../../components/AddCommentToThread";
import ThreadComments from "../../components/ThreadComments";

class ThreadDetails extends Component {
  render() {
    const {
      currentTheme,
      uniqueCreatorId,
      loggedin,
      handleChange,
      backButton,
      backToTopOfPage,
      threadTitle,
      threadDescription,
      threadComment,
      addOneCommentToThread,
      allThreads,
      disableEditThreadDetails,
      enableEditThreadDetails,
      validateEditedThreadDetails,
      showDeleteThreadModal,
      validateUserToUpvoteComment,
      validateUserToDownvoteComment,
      disableUpVoteButton,
      disableDownVoteButton
    } = this.props;
    const dateSubString = allThreads.date.substring(0, 10);
    const newDate = new Date(dateSubString);
    newDate.setDate(newDate.getDate() + 1);
    const formattedDate = newDate.toLocaleDateString("en-US");
    const formattedEmail = allThreads.email.replace(/@[^@]+$/, '');

    return (
      <div id="forumPage" className={`mt-3 box ${currentTheme.background}`}>
        <div className="row text-center">
          <div className="col-md-12">
            <label><h4>Forum</h4></label>
          </div>
        </div>
        <div>
          <div className="row">
            <div className="col-md-4">
              <button className="backButton" onClick={backButton}>Back</button>
            </div>
            <div className="col-md-4"></div>
            <div className="col-md-4"></div>
          </div>
          <hr className={currentTheme.hr} />
          <Container>
            <div className={`row threadDetails ${currentTheme.oneThread}`}>
              <div className="col-md-12 breakWord">
                <div>Author: {formattedEmail}</div>
                <div>Posted on: {formattedDate}</div>
                <hr />
                {
                  allThreads.creator === uniqueCreatorId ?
                    (
                      <React.Fragment>
                        {
                          disableEditThreadDetails ?
                            (
                              <React.Fragment>
                                <h4 className="breakWord">{threadTitle}</h4>
                                <hr />
                                <div className="breakWord">{threadDescription}</div>
                                <br />
                              </React.Fragment>
                            ) : (
                              <React.Fragment>
                                <textarea
                                  className="threadTitleTextArea"
                                  type="text"
                                  ref="threadTitle"
                                  name="threadTitle"
                                  maxLength="200"
                                  onChange={handleChange}
                                  value={threadTitle}
                                />
                                <textarea
                                  className="threadDescriptionTextArea"
                                  type="text"
                                  ref="threadDescription"
                                  name="threadDescription"
                                  maxLength="1250"
                                  onChange={handleChange}
                                  value={threadDescription}
                                />
                              </React.Fragment>
                            )
                        }
                        <div className="row text-center">
                          {
                            disableEditThreadDetails ?
                              (
                                <React.Fragment>
                                  <div className="col-md-4"></div>
                                  <div className="col-md-4"></div>
                                  <div className="col-md-4">
                                    <button
                                      id="editThreadTitleButton"
                                      title="Edit"
                                      type="button"
                                      className="cancelBtn"
                                      onClick={() => enableEditThreadDetails()}>
                                      Edit
                                    </button>
                                  </div>
                                </React.Fragment>
                              ) : (
                                <React.Fragment>
                                  <div className="col-md-4">
                                    <button
                                      id="deleteThreadButton"
                                      title="Delete Thread"
                                      type="button"
                                      className="addBtn"
                                      onClick={() => showDeleteThreadModal()}>
                                      Delete
                                    </button>
                                  </div>
                                  <div className="col-md-4">
                                    <button
                                      id="saveEditedThreadTitleButton"
                                      title="Save Thread"
                                      type="button"
                                      className="addBtn"
                                      onClick={() => validateEditedThreadDetails()}>
                                      Save
                                    </button>
                                  </div>
                                  <div className="col-md-4">
                                    <button
                                      id="cancelEditThreadTitleButton"
                                      title="Cancel"
                                      type="button"
                                      className="cancelBtn"
                                      onClick={() => enableEditThreadDetails()}>
                                      Cancel
                                    </button>
                                  </div>
                                </React.Fragment>
                              )
                          }
                        </div>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <h4 className="breakWord">{threadTitle}</h4>
                        <hr />
                        <div className="breakWord">{threadDescription}</div>
                      </React.Fragment>
                    )
                }
              </div>
            </div>
          </Container>
          {
            loggedin ?
              (
                <React.Fragment>
                  <br />
                  <AddCommentToThread
                    handleChange={handleChange}
                    threadComment={threadComment}
                    addOneCommentToThread={addOneCommentToThread}
                    currentTheme={currentTheme}
                  />
                </React.Fragment>
              ) : (
                null
              )
          }
          <hr className={currentTheme.hr} />
          {
            allThreads.comments.length > 0 ?
              (
                <React.Fragment>
                  {
                    allThreads.comments.sort((a, b) => { return new Date(b.date) - new Date(a.date) }).map(threadComment => {
                      return (
                        <ThreadComments
                          key={threadComment._id}
                          _id={threadComment._id}
                          loggedin={loggedin}
                          date={threadComment.date}
                          email={threadComment.email}
                          comment={threadComment.comment}
                          votes={threadComment.votes}
                          validateUserToUpvoteComment={validateUserToUpvoteComment}
                          validateUserToDownvoteComment={validateUserToDownvoteComment}
                          disableUpVoteButton={disableUpVoteButton}
                          disableDownVoteButton={disableDownVoteButton}
                          currentTheme={currentTheme}
                        />
                      )
                    })
                  }
                </React.Fragment>
              ) : (
                <div className="text-center">
                  <strong>
                    <label>{defaults.noCommentsOnThread}</label>
                  </strong>
                </div>
              )
          }
          <hr className={currentTheme.hr} />
          <div className="row">
            <div className="col-md-6 text-left noWidthMobileDisplay">
              <button className="backButton" onClick={backButton}>Back</button>
            </div>
            <br />
            <div className="col-md-6 text-right noWidthMobileDisplay">
              <button className="backToTopButton" onClick={backToTopOfPage}>Top</button>
            </div>
          </div>
        </div>
      </div >
    );
  }
};

export default ThreadDetails;
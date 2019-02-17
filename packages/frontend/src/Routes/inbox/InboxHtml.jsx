import React from "react";

export const InboxHtml = ({ parent, messages }) => {
  console.log('re-rendering html')
  console.log('messages:')
  console.log(messages)
  return (
    <div >
      <ul className="list-group py-2">
        {messages && messages.length > 0
          ? messages.map((item, idx) => (
              <li
                key={idx}
                className="list-group-item list-group-item-action"
              >
                  <div className="custom-control">
                      <label
                        className="custom-control-label text-nowrap"
                      >
                        <a
                          title="send mail"
                          href={"mailto:" + item.address}
                        >
                          {item.address}{" "}
                          <span className="icon icon-envelope far fa-fw fa-envelope mr-md-1" />
                        </a>
                      </label>
                  </div>
                  <div className="col-auto px-0 order-last order-sm-2 d-none d-sm-block align-self-center text-right">
                    <a
                      className="text-secondary px-md-1"
                      title="Deleted"
                      href="/"
                    >
                      <span className="icon icon-trash fa fa-fw fa-trash" />
                    </a>
                  </div>
                  <div
                    className="col-sm-12 col-10 py-2 order-3"
                    onClick={() => parent.doShow(idx)}
                  >
                    <div className="float-right text-right">
                      <span
                        className={
                          " d-none d-sm-block " +
                          (!item.read ? "font-weight-bold" : "")
                        }
                      >
                        {item.time}
                      </span>
                    </div>
                    <p className="lead mb-0">
                      <a className="subject-text"
                        title={
                          !item.read
                            ? "This is a new message"
                            : "View this message"
                        }
                        onClick={() => parent.doShow(idx)}
                      >
                        {item.subject}
                      </a>
                      {item.attachment ? (
                        <i className="align-middle fa fa-paperclip icon-paper-clip" />
                      ) : null}
                      <button
                        type="button"
                        className="btn btn-outline-secondary btn-sm ml-2 d-none d-md-inline"
                        onClick={() => parent.doShow(idx)}
                      >
                        Open
                      </button>
                    </p>
                  </div>
              </li>
            ))
          : null}
      </ul>
    </div>
  );
};

export default InboxHtml;

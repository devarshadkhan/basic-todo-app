import React, { useState } from "react";
import { Button, Modal } from "antd";
const TodoShowList = ({ addData, setAddData, showEdit, AddItem }) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [toggle, setToggle] = useState(true);
  
  const [inputTodo, setInputTodo] = useState("");
  const [isEditItem, setIsEditItem] = useState(null);

  // modal
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  
  // Delete Item
  const DeleteItem = (index) => {
    const DelItems = addData.filter((e) => {
      return index !== e.id;
    });
    setAddData(DelItems);
  };

  // Edit Item

  const EditItem = (id) => {
    const EditshowItem = addData.find((e) => {
      return e.id === id;
    });
    // setToggle(true);
    setOpen(true);
    setInputTodo(EditshowItem.name);
    setIsEditItem(id);
  };

  // modal Handle Save Button
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      if (!inputTodo) {
        alert("please enter the feild");
      }  
      
      else if (inputTodo && !isEditItem) {
        setAddData(
          addData.map((e,id) => {
            if (e.id === id) {
              return { ...e, name:inputTodo };
            }
            return e;
          })
        );
        // setToggle(true);
        setOpen(true);
        setInputTodo("");
        setIsEditItem(null);
      }


      else {
        const getAllDatas = {
          id: new Date().getTime().toString(),
          name: inputTodo,
        };
        setAddData([...addData, getAllDatas]);
        setInputTodo("");
        
      }
      setConfirmLoading(false);
    }, 1000);
  };

  return (
    <>
      <div className="tab-content" id="ex1-content">
        <ul className="list-group mb-0">
          {addData.map((e) => {
            return (
              <>
                <div key={e.id}>
                  <li
                    className="list-group-item d-flex align-items-center gap-4 border-0 mb-2 rounded"
                    style={{ backgroundColor: "#f4f6f7" }}
                  >
                    {/* <span>{ind}</span> */}
                    {e.name}
                    <div style={{ marginLeft: "auto" }}>
                      <button
                        className="btn btn-danger"
                        style={{ marginRight: "1rem" }}
                        onClick={() => EditItem(e.id)}
                      >
                        Edit
                        {/* {toggle?"Save":"Edit"} */}
                      </button>
                      <button
                        className="btn btn-danger"
                        style={{ marginLeft: "1rem" }}
                        onClick={() => DeleteItem(e.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                </div>
              </>
            );
          })}
        </ul>
      </div>
      {/* <Button type="primary" onClick={showModal}>
        Open Modal with async logic
      </Button> */}
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        okText="Save"
        cancelText="cancel"
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <form className="d-flex justify-content-center align-items-center mb-4">
          <div className="form-outline flex-fill">
            <input
              type="text"
              id="form2"
              className="form-control"
              placeholder="Add items..."
              value={inputTodo}
              onChange={(e) => setInputTodo(e.target.value)}
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default TodoShowList;
// else if (inputTodo && !isEditItem) {
//   setAddData(
//     addData.map((e,id) => {
//       if (e.id === id) {
//         return { ...e, name:inputTodo };
//       }
//       return e;
//     })
//   );
//   // setToggle(true);
//   setOpen(true);
//   setInputTodo("");
//   setIsEditItem(null);
// }
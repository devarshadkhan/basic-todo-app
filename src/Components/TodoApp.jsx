import React, { useEffect, useState } from "react";
import EditList from "./EditList";
import TodoShowList from "./TodoShowList";

import { Button, Modal } from "antd";


const getLocalData = ()=>{
  const DataList = localStorage.getItem("addData")
  console.log(DataList)
  if(DataList){
     return JSON.parse(localStorage.getItem("addData"))
  }
  return  [];
}
 
const TodoApp = () => {
  // Todo App Starting code :)

  const [isShow,setIsShow] = useState(false)

  const [inputTodo, setInputTodo] = useState("")
  const [addData, setAddData] = useState(getLocalData())
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);



    const AddItem = ()=>{
      if(!inputTodo){
        alert("please enter the feild")
      }
      else if (inputTodo && !toggle) {
        setAddData(
          addData.map((e) => {
            if (e.id === isEditItem) {
              return { ...e, name:inputTodo };
            }
            return e;
          })
        );
        setToggle(true);
        setOpen(true);
        setIsShow(true)
        setInputTodo("");
        setIsEditItem(null);
      }else{
        const getAllDatas = {id:new Date().getTime().toString(), name:inputTodo}
        setAddData([...addData,getAllDatas]);
        setInputTodo("")
        setIsShow(true)
      }
    }

    // Data with local storage  :)

    







   

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
    setToggle(false);
    setInputTodo(EditshowItem.name);
    setIsEditItem(id);
  };

  // modal Handle Save Button
  // const handleOk = () => {
  //   setConfirmLoading(true);
  //   setTimeout(() => {
  //     setOpen(false);
  //     if (inputTodo) {
  //       const getAllDatas = {
  //         id: new Date().getTime().toString(),
  //         name: inputTodo,
  //       };
  //       setAddData([...addData, getAllDatas]);
  //       setInputTodo("");
  //     }  
      
  //     else if (inputTodo ) {
  //       setAddData(
  //         addData.map((e,id) => {
  //           if (e.id === isEditItem) {
  //             return { ...e, name:inputTodo };
  //           }
  //           return e;
  //         })
  //       );
  //       // setToggle(true);
  //       setOpen(true);
  //       setInputTodo("");
  //       setIsEditItem(null);
  //     }

      
  //     else {
  //       alert("please enter the feild");
  //     }
  //     setConfirmLoading(false);
  //   }, 1000);
  // };

  useEffect(()=>{
    localStorage.setItem("addData", JSON.stringify(addData) )
    localStorage.getItem("addData", JSON.stringify(addData) )
  },[addData])


  return (
    <>
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <h1 className="text-center" style={{color:"#fff"}}>Basic React Todo App</h1>
              <div className="card">
                <div className="card-body p-5">
                  <form className="d-flex justify-content-center align-items-center mb-4">
                    <div className="form-outline flex-fill">
                      <input type="text" id="form2" className="form-control" placeholder="Add items..." value={inputTodo} onChange={(e) => setInputTodo(e.target.value)} />
                    </div>

                     {
                      <p className="btn btn-info ms-2 mb-0" onClick={AddItem}>{toggle?"Add":"Save"}</p>
                     } 
                     {/* {
                      toggle?<p className="btn btn-info ms-2 mb-0" onClick={AddItem}>Add</p>:<p className="btn btn-info ms-2 mb-0" onClick={AddItem}>Save</p>
                     }  */}
                    
                  </form>
                  <p>New Task...</p>
                 

                  {/* <TodoShowList addData={addData} setAddData={setAddData} inputTodo={inputTodo}  AddItem={AddItem}  /> */}
                  {isShow ? <div className="tab-content" id="ex1-content">
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
      :
      <p style={{textAlign:"center",fontSize:"1rem"}}>NO Add Todo's</p>}
      {/* <Button type="primary" onClick={showModal}>
        Open Modal with async logic
      </Button> */}
      {/* <Modal
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
      </Modal> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TodoApp;

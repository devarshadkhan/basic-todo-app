import React, {useState, useEffect} from 'react'
import "../App.css";
// import todo from "../images/todo.svg";


const getLocalItems = () => {
    let list = localStorage.getItem('lists');
    console.log(list);
    if (list) {
        console.log(JSON.parse(localStorage.getItem('lists')));
        return JSON.parse(localStorage.getItem('lists'));
    } else {
        return []
    }
};

const Testtodo = () => {

    const [inputData, setInputData] = useState('');

    const [items, setItems] = useState(getLocalItems());

    const [toogleSubmit, setToggleSubmit] = useState(true);

    const [isEditItem, setIsEditItem] = useState(null);

    const addItem = () => {
        if (!inputData) {
            alert('plz fill the data');
        }
        else if (inputData && !toogleSubmit) {
            // alert('I am clicked ');
            
            setItems(
                items.map((elem) => {
                    if (elem.id === isEditItem) {
                        console.log('I am matched ');
                        return { ...elem, name:inputData };
                    }
                    return elem;
                })
            );
            setToggleSubmit(true);
            setInputData('');
            setIsEditItem(null);
        }
        else {
            const allInputData = { id: new Date().getTime().toString() , name:inputData}
            setItems([...items, allInputData]);
            setInputData('');
        }
        
    }

    const deleteItem = (id) => {
        // console.log('deleted');
        const updatedItems = items.filter((elem) => {
            return elem.id !== id;
        })
        setItems(updatedItems);
    }


 // edit the item
//     When user clikc on edit button 

// 1: get the id and name of the data which user clicked to edit
// 2: set the toggle mode to change the submit button into edit button
// 3: Now update the value of the setInput with the new updated value to edit. 
// 4: To pass the current element Id to new state variable for reference 
    
    const editItem = (id) => {

        let newEditItem = items.find((elem) => {
            return elem.id === id;
        })
        console.log(newEditItem.name);

        setToggleSubmit(false);

        setInputData(newEditItem.name);
        console.log("my new input name is" + inputData);
        setIsEditItem(id);

    }


    // remove all the data 
    const remvoveAll = () => {
        setItems([]);
    }

    // add data to localStorage
    useEffect(() => {
        // localStorage.setItem('thapaName', 'vinod');
        localStorage.setItem('lists', JSON.stringify(items));
    }, [items]);

    return (
       <>
            <div className="main-div">
                <div className="child-div">
                    <figure>
                        {/* <img src={todo} alt="todoLogo" /> */}
                        <figcaption>Add your list here ✌ </figcaption>
                        {/* <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> */}
                    </figure>
                    <div className="addItems">
                        <input type="text" className="form-control" placeholder="✍️ Add item..."
                            value={inputData }
                            onChange={(e) => setInputData(e.target.value)}
                        />

                        {/* toggle the submit btn with the edit btn  */}
                        { toogleSubmit ? <i className="fa fa-plus add-btn" title="Add item" onClick={() => addItem()}></i> :  <i className="far fa-edit add-btn" title="Edit item" onClick={addItem}></i> }
                        
                    </div>

                    <div className="showItems">
                        {
                            items.map((elem) => {
                                return (
                                    <div className="eachItem" key={elem.id}>
                                        <h3> {elem.name} </h3>
                                        <div className='todo-btn'>
                                            <i className="far fa-edit add-btn" title="Edit item" onClick={() => editItem(elem.id)}></i>
                                            <i className="far fa-trash-alt add-btn" title="Delete item" onClick={() => deleteItem(elem.id)}></i>
                                        </div>
                                       
                                    </div>
                                )
                            })
                        }
                        
                    </div>

                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove All" target="_blank" onClick={remvoveAll}><span>CHECK LIST </span></button>
                    </div>

                </div>
         </div>   
      </>
    )
}

export default Testtodo










// // css
// .gradient-custom {
//   background: radial-gradient(50% 123.47% at 50% 50%, #00ff94 0%, #720059 100%),
//     linear-gradient(121.28deg, #669600 0%, #ff0000 100%),
//     linear-gradient(360deg, #0029ff 0%, #8fff00 100%),
//     radial-gradient(100% 164.72% at 100% 100%, #6100ff 0%, #00ff57 100%),
//     radial-gradient(100% 148.07% at 0% 0%, #fff500 0%, #51d500 100%);
//   background-blend-mode: screen, color-dodge, overlay, difference, normal;
// }
// .time {
// 	display: block;
// 	font-size: 1.2rem;
// 	font-weight: 300;
// 	margin-top: -0.2rem;
// 	color: var(--black-2);
// }

// @import url("https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300&display=swap");

// * {
//   margin: 0;
//   padding: 0;
//   box-sizing: border-box;
//   font-family: "Source Sans Pro", sans-serif;
// }

// html {
//   font-size: 62.5%;
// }

// .main-div {
//   min-height: 100vh;
//   background: #060822;
//   display: flex;
//   justify-content: center;
//   /* align-items: center; */
// }

// .child-div {
//   text-align: center;
//   margin-top: 12rem;
// }

// .child-div figure img {
//   width: 10rem;
//   height: 8rem;
// }

// .child-div figure figcaption {
//   color: #fff;
//   font-size: 2.2rem;
//   padding-top: 2rem;
//   text-transform: capitalize;
// }

// input {
//   /* display: block; */
//   min-width: 40rem;
//   height: 3.4rem;
//   padding: 2rem 1.2rem;
//   font-size: 1.8rem;
//   line-height: 1.42857143;
//   margin-top: 2rem;
//   color: rgb(58, 57, 57);
//   background-color: #fff;
//   background-image: none;
//   border: 0.1rem solid #ccc;
//   border-radius: 0.4rem;
//   -webkit-box-shadow: inset 0 0.1rem 0.1rem rgb(0 0 0 / 8%);
//   box-shadow: inset 0 0.1rem 0.1rem rgb(0 0 0 / 8%);
//   transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
// }

// input,
// input:focus,
// input:active,
// input:active:focus {
//   border: none;
//   padding: 2.3rem 1.5rem;
//   outline: none;
// }
// input {
//   -webkit-box-shadow: none;
//   box-shadow: none;
//   -webkit-transition: all 0.2s linear;
//   transition: all 0.2s linear;
// }
// input:focus {
//   -webkit-box-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.2);
//   box-shadow: 0 0 1.5rem rgba(0, 0, 0, 0.2);
// }

// /*  Please Subscribe to ThapaTechnical Youtube Channel
// /* Click Here: https://www.youtube.com/thapatechnical  */

// .todo-btn {
//   width: 5rem;
//   display: flex;
//   justify-content: space-around;
// }

// .fa {
//   margin-left: -2.5rem;
//   cursor: pointer;
//   pointer-events: auto;
//   z-index: 10;
//   background-color: #fff;
//   background-image: none;
//   color: #666;
//   -webkit-transition: color 0.15s linear;
//   transition: color 0.15s linear;
//   font-size: 2rem;
// }
// .fa:hover {
//   color: rgb(47, 214, 122);
// }

// .fa-plus:before {
//   content: "\f067";
//   font-size: 1.5rem;
// }

// .showItems {
//   margin-top: 3rem;
//   text-align: center;
// }

// .eachItem {
//   background: #fff;
//   padding: 1.2rem 1rem;
//   border-radius: 0.5rem;
//   margin-bottom: 0.7rem;
//   margin-left: 1rem;
//   min-width: 40rem;
//   word-break: break-word;
//   background: rgb(85, 41, 220);
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
// }

// .eachItem:hover {
//   background: rgb(249, 249, 252);
//   color: rgb(85, 41, 220);
// }

// .showItems .eachItem h3 {
//   padding-left: 1rem;
//   font-size: 1.6rem;
//   color: #fff;
// }

// .fa-trash-alt,
// .fa-edit {
//   /* margin-left: -2.5rem; */
//   cursor: pointer;
//   pointer-events: auto;
//   z-index: 10;
//   color: rgb(251, 251, 251);
//   -webkit-transition: color 0.15s linear;
//   transition: color 0.15s linear;
//   font-size: 2rem;
// }

// .addItems .fa-edit {
//   color: rgb(47, 214, 122);
// }

// .fa-edit {
//   margin-left: -3.5rem;
// }

// /*  Please Subscribe to ThapaTechnical Youtube Channel
// /* Click Here: https://www.youtube.com/thapatechnical  */

// .eachItem:hover .fa-trash-alt {
//   color: rgb(214, 47, 61);
// }

// .eachItem:hover .fa-edit {
//   color: rgb(100, 214, 47);
// }

// .eachItem:hover h3 {
//   color: rgb(85, 41, 220);
// }

// .btn {
//   letter-spacing: 0.1em;
//   cursor: pointer;
//   font-size: 14px;
//   font-weight: 400;
//   line-height: 45px;
//   max-width: 160px;
//   position: relative;
//   text-decoration: none;
//   text-transform: uppercase;
//   width: 100%;
// }
// .btn:hover {
//   text-decoration: none;
// }

// .effect04 {
//   --uismLinkDisplay: var(--smLinkDisplay, inline-flex);
//   display: var(--uismLinkDisplay);
//   color: #000;
//   outline: solid 2px #000;
//   position: relative;
//   transition-duration: 0.4s;
//   overflow: hidden;
// }

// .effect04::before,
// .effect04 span {
//   margin: 0 auto;
//   transition-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
//   transition-duration: 0.4s;
// }

// .effect04:hover {
//   background-color: rgb(85, 41, 220);
// }

// .effect04:hover span {
//   -webkit-transform: translateY(-400%) scale(-0.1, 20);
//   transform: translateY(-400%) scale(-0.1, 20);
// }

// .effect04::before {
//   content: attr(data-sm-link-text);
//   color: #fff;
//   position: absolute;
//   left: 0;
//   right: 0;
//   margin: auto;
//   -webkit-transform: translateY(500%) scale(-0.1, 20);
//   transform: translateY(500%) scale(-0.1, 20);
// }

// .effect04:hover::before {
//   letter-spacing: 0.05em;
//   -webkit-transform: translateY(0) scale(1, 1);
//   transform: translateY(0) scale(1, 1);
// }
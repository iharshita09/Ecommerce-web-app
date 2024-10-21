import React from 'react'
import './NewCollections.css'
import Item from '../Item/Item'

const NewCollections = (props) => {
  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
        {props.data.map((item,index)=>{
                return <Item id={item.id} key={index} name={item.name} image={item.image}  new_price={item.new_price} old_price={item.old_price}/>
            })}
      </div>
    </div>
  )
}

export default NewCollections
//           {/* props.data.map((item, index) => { ... }): The map function is used to loop through the array of items in props.data. For each item, an Item component is rendered.
// //            */}
// // {/* 
// // <Item>: For each item in the array, an Item component is created. The id, name, image, new_price, and old_price of each item are passed as props to the Item component. */}

// // {/* the index of the item in the array is used as the key. */}


// import React from 'react'
// import './NewCollections.css'
// import new_collection from '../Assets/new_collections'
// import Item from '../Item/Item'

// const NewCollections = () => {
//   return (
//     <div className='new-collections'>
//       <h1>NEW COLLECTIONS</h1>
//       <hr />
//       <div className="collections">
//         {new_collection.map((item,i)=>{
//             return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
//         })}
//       </div>
//     </div>
//   )
// }

// export default NewCollections
// import React from 'react'
// import './NewCollections.css'
// import Item from '../Item/Item'

// const NewCollections = (props) => {
//   return (
//     <div className='new-collections'>
//       <h1>NEW COLLECTIONS</h1>
//       <hr />
//       <div className="collections">
//         {props.data.map((item,index)=>{
//                 return <Item id={item.id} key={index} name={item.name} image={item.image}  new_price={item.new_price} old_price={item.old_price}/>
//             })}
//             {/* props.data.map((item, index) => { ... }): The map function is used to loop through the array of items in props.data. For each item, an Item component is rendered.
//            */}
// {/* 
// <Item>: For each item in the array, an Item component is created. The id, name, image, new_price, and old_price of each item are passed as props to the Item component. */}

// {/* the index of the item in the array is used as the key. */}
//       </div>
//     </div>
//   )
// }

// export default NewCollections


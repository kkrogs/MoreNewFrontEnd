// import React from 'react';
// import { Link } from 'react-router-dom';

// const MemoryList = ({
//     memories,
//     showTitle = true,
// }) => {
//   if (!memories.length) {
//     return <h3>You don't have any memories recorded...</h3>;
//   }

//   return (
//     <div>
//       {showTitle && <h3>{title}</h3>}
//       {memories &&
//         memories.map((memory) => (
//           <div key={memory._id} className="card mb-3">
//             <h4 className="card-header bg-primary text-light p-2 m-0">
//               {showUsername ? (
//                 <Link
//                   className="text-light"
//                   to={`/profiles/${memory.memoryAuthor}`}
//                 >
//                   {memory.memoryAuthor} <br />
//                   <span style={{ fontSize: '1rem' }}>
//                     had this memory on {memory.createdAt}
//                   </span>
//                 </Link>
//               ) : (
//                 <>
//                   <span style={{ fontSize: '1rem' }}>
//                     You had this memory on {memory.createdAt}
//                   </span>
//                 </>
//               )}
//             </h4>
//             <div className="card-body bg-light p-2">
//               <p>{memory.memoryText}</p>
//             </div>
//             <Link
//               className="btn btn-primary btn-block btn-squared"
//               to={`/memorys/${memory._id}`}
//             >
//               Join the discussion on this memory.
//             </Link>
//           </div>
//         ))}
//     </div>
//   );
// };

// export default MemoryList;
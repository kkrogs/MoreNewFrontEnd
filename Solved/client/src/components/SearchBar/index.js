









// Reference article: https://www.freecodecamp.org/news/search-and-filter-component-in-reactjs/

// const [error, setError] = useState(null);
// const [isLoaded, setIsLoaded] = useState(false);
// const [items, setItems] = useState([]);

// //     set search query to empty string
// const [q, setQ] = useState("");
// //     set search parameters
// //     we only what to search countries by capital and name
// //     this list can be longer if you want
// //     you can search countries even by their population
// // just add it to this array
// const [searchParam] = useState(["capital", "name"]);

// useEffect(() => {
//     // our fetch codes
// }, []);

// }

// return items.filter((item) => {
//     return searchParam.some((newItem) => {
//         return (
//             item[newItem]
//                 .toString()
//                 .toLowerCase()
//                 .indexOf(q.toLowerCase()) > -1
//         );
//     });
// });
// }

// return <>{error.message}</>;
// } else if (!isLoaded) {
//     return <>loading...</>;
// } else {
//     return (
//         <div className="wrapper">
//             <div className="search-wrapper">
//                 <label htmlFor="search-form">
//                     <input
//                         type="search"
//                         name="search-form"
//                         id="search-form"
//                         className="search-input"
//                         placeholder="Search for..."
//                         value={q}
//                         /*
//                         // set the value of our useState q
//                         //  anytime the user types in the search box
//                         */
//                         onChange={(e) => setQ(e.target.value)}
//                     />
//                     <span className="sr-only">Search countries here</span>
//                 </label>
//             </div>
//             <ul className="card-grid">
//                 {items.map((item) => (
//                     <li>
//                         <article className="card" key={item.callingCodes}>
//                             <div className="card-image">
//                                 <img src={item.flag} alt={item.name} />
//                             </div>
//                             <div className="card-content">
//                                 <h2 className="card-name">{item.name}</h2>
//                                 <ol className="card-list">
//                                     <li>
//                                         population:{" "}
//                                         <span>{item.population}</span>
//                                     </li>
//                                     <li>
//                                         Region: <span>{item.region}</span>
//                                     </li>
//                                     <li>
//                                         Capital: <span>{item.capital}</span>
//                                     </li>
//                                 </ol>
//                             </div>
//                         </article>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }
// }

// ReactDOM.render(<App />, document.getElementById("root"));
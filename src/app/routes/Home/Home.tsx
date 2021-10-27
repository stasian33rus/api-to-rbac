// /* eslint-disable @typescript-eslint/ban-types */
// import React from 'react';

// export type HomeProps = StateProps & DispatchProps;

// interface StateProps {
//     json?: Record<string, unknown>;
// }

// interface DispatchProps {
//     onUploadFile?: () => void;
// }

// export function Home(props: HomeProps): React.ReactElement {
//     const [file, setFile] = React.useState<Record<string, undefined>>();
//     const [users, setUsers] = React.useState<string[]>([]);
//     const [addingUserName, setAddingUserName] = React.useState<string>();
//     const reader = new FileReader();
//     const methods = getMethods(file);

//     const userFields = [...users];

//     return (
//         <div className="home">
//             <header></header>
//             <section>
//                 <form>
//                     <input
//                         type="file"
//                         className="home__input-file"
//                         onChange={(event) => {
//                             reader.readAsText(event.target.files[0]);
//                             reader.onload = (evt) => {
//                                 const result = evt.target.result;
//                                 if (typeof result === 'string') {
//                                     setFile(JSON.parse(result));
//                                 } else {
//                                     throw new Error('error happens when try read file as text');
//                                 }
//                             };
//                         }}
//                         // in next update add support ".yaml" files
//                         accept=".json"
//                     />
//                     <br />
//                     {file && (
//                         <React.Fragment>
//                             <b>Методы-</b>
//                             <div>
//                                 {methods.map((method) => (
//                                     <React.Fragment key={method[0]}>
//                                         <div key={method[0]}>
//                                             <br />
//                                             Api Метод: "{method[0]}". HTTP Методы: "{method[1]}".
//                                         </div>
//                                         {users[0] === undefined && <div>Добавьте пользователя</div>}
//                                         {users[0] !== undefined && (
//                                             <React.Fragment>
//                                                 <div>Выберите пользователей</div>
//                                                 {userFields.map((user, index) => (
//                                                     <div key={method[0] + index}>
//                                                         <input id={method[0] + index} type="checkbox" />
//                                                         <label htmlFor={method[0] + index}>{user}</label>
//                                                     </div>
//                                                 ))}
//                                             </React.Fragment>
//                                         )}
//                                     </React.Fragment>
//                                 ))}
//                             </div>
//                         </React.Fragment>
//                     )}
//                     <input
//                         type="text"
//                         onChange={(event) => {
//                             setAddingUserName(event.target.value);
//                         }}
//                     />
//                     <button
//                         type="button"
//                         disabled={!addingUserName}
//                         onClick={() => {
//                             setUsers([...users, addingUserName]);
//                             setAddingUserName(undefined);
//                         }}
//                     >
//                         Добавить пользователя
//                     </button>
//                 </form>
//             </section>
//             <footer></footer>
//         </div>
//     );
// }

// function getMethods(json?: Record<string, undefined>): (string | string[])[] {
//     if (json == undefined) {
//         return;
//     }

//     const result: (string | string[])[] = [];
//     const keys = Object.keys(json);
//     for (let i = 0; i < keys.length; i++) {
//         const key = keys[i];
//         if (!/^\/([a-z,A-Z]+).+/.test(key)) {
//             if (typeof json[key] !== 'object') {
//                 continue;
//             }
//             getMethods(json[key]);
//         } else {
//             const httpMethods = Object.keys(json[key]);
//             result.push([key, httpMethods.join(',')]);
//         }
//     }
//     return result;
// }

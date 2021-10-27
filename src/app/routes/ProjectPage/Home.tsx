// import React from 'react';
// import { MethodForm } from '../MethodForm';
// import { Form, Field, FormSpy } from 'react-final-form';
// import YAML from 'yaml';
// // import fs from 'fs';
// import Dropzone from 'react-dropzone';
// import './Home.css';

// export function Home(): React.ReactElement {
//     const [file, setFile] = React.useState<Record<string, undefined>>();
//     const [users, setUsers] = React.useState<string[]>([]);

//     const methods = getMethods(file);
//     const userFields = [...users];

//     return (
//         <div className="home">
//             <header></header>
//             <section>
//                 <Form
//                     onSubmit={() => {
//                         //
//                     }}
//                     validate={() => {
//                         return {};
//                     }}
//                     render={({ handleSubmit, form, values }) => (
//                         <form onSubmit={handleSubmit}>
//                             <FormSpy>
//                                 {({ values }) => {
//                                     console.log(values);

//                                     return null;
//                                 }}
//                             </FormSpy>

//                             <Dropzone
//                                 accept=".json, .yaml"
//                                 multiple={false}
//                                 onDrop={([f]) => {
//                                     console.log(f);
//                                     if (f.type === 'application/json') {
//                                         readAsText(f)
//                                             .catch((err) => {
//                                                 return Promise.reject(err);
//                                             })
//                                             .then((event) => {
//                                                 if (event.target === null) {
//                                                     return Promise.reject(
//                                                         new Error('unexpected null target in ProgressEvent'),
//                                                     );
//                                                 }
//                                                 if (typeof event.target.result !== 'string') {
//                                                     return Promise.reject(
//                                                         new Error(
//                                                             `unexpected file content type ${typeof event.target
//                                                                 .result}`,
//                                                         ),
//                                                     );
//                                                 }

//                                                 const content = event.target.result;

//                                                 setFile(JSON.parse(content));
//                                             });
//                                     } else if (/(\.yaml)$/.test(f.name)) {
//                                         // const file = fs.readFileSync(f.path, 'utf8');
//                                         // YAML.parse(file);
//                                     } else {
//                                         throw new Error('file type not supported');
//                                     }
//                                 }}
//                             >
//                                 {({ getRootProps, getInputProps }) => (
//                                     <section>
//                                         <div {...getRootProps({ className: 'dropzone' })}>
//                                             <input {...getInputProps()} />
//                                             {!file && <p>Загрузить файл</p>}
//                                             {file && <p>Загрузить другой файл</p>}
//                                         </div>
//                                     </section>
//                                 )}
//                             </Dropzone>

//                             <Field
//                                 key="addingUserName"
//                                 name="addingUserName"
//                                 validate={(value) => {
//                                     if (
//                                         value == '123' ||
//                                         value == undefined ||
//                                         value == '' ||
//                                         users.filter((val) => val == value).length === 0
//                                     ) {
//                                         return 'данный пользователь уже добавлен';
//                                     }
//                                     return null;
//                                 }}
//                             >
//                                 {({ input }) => <input {...input} type="text" placeholder="Укажите пользователя" />}
//                             </Field>
//                             <div>
//                                 <button
//                                     type="button"
//                                     disabled={!values.addingUserName}
//                                     onClick={() => {
//                                         setUsers([...users, values.addingUserName]);
//                                         form.resetFieldState('addingUserName');
//                                     }}
//                                 >
//                                     Добавить пользователя
//                                 </button>
//                                 <button
//                                     type="button"
//                                     disabled={!values.addingUserName}
//                                     onClick={() => {
//                                         setUsers([...users].filter((item) => item !== values.addingUserName));
//                                         form.resetFieldState('addingUserName');
//                                     }}
//                                 >
//                                     Удалить пользователя
//                                 </button>
//                             </div>
//                             {methods &&
//                                 [...methods].map((method) => (
//                                     <MethodForm
//                                         users={userFields}
//                                         method={method[0]}
//                                         httpMethods={method[1]}
//                                         key={method.toString()}
//                                     />
//                                 ))}
//                             <button type="button">Сгенерировать rbac файл</button>
//                         </form>
//                     )}
//                 />
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

// function readAsText(file: File): Promise<ProgressEvent<FileReader>> {
//     return new Promise((resolve, reject) => {
//         const fileReader = new FileReader();
//         fileReader.onload = resolve;
//         fileReader.onerror = reject;
//         fileReader.readAsText(file);
//     });
// }

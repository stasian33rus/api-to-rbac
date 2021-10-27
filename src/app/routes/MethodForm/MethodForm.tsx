// import React, { ReactElement } from 'react';
// import { Field } from 'react-final-form';

// export interface MethodFormProps {
//     method: string;
//     httpMethods: string | string[];
//     users?: string[];
// }

// export function MethodForm(props: MethodFormProps): ReactElement {
//     const { httpMethods, method, users = [] } = props;

//     return (
//         <React.Fragment key={method}>
//             <br />
//             <div className="method-form__methods">
//                 Api Метод: "{method}". HTTP Методы:
//                 {httpMethods &&
//                     typeof httpMethods !== 'string' &&
//                     httpMethods.map((m) => (
//                         <span className="method-form__methods__http-method" key={m}>
//                             "{m}".
//                         </span>
//                     ))}
//                 {typeof httpMethods === 'string' && <span>{httpMethods}</span>}
//             </div>
//             {users[0] === undefined && <div>Добавьте пользователя</div>}
//             {users[0] !== undefined && (
//                 <React.Fragment>
//                     <div>Выберите пользователей</div>
//                     {users.length > 2 && <div>выбрать всех</div>}
//                     {users.map((user) => (
//                         <Field key={method + user} name={method + ':' + user} id={method + user} type="checkbox">
//                             {({ input }) => (
//                                 <div>
//                                     <input {...input} />
//                                     <label id={method + user}>{user}</label>
//                                 </div>
//                             )}
//                         </Field>
//                     ))}
//                 </React.Fragment>
//             )}
//         </React.Fragment>
//     );
// }

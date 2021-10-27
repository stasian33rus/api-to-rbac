import React from 'react';
import Dropzone from 'react-dropzone';
// import { MethodForm } from '../MethodForm';
import YAML from 'yaml'
import { observer } from "mobx-react"
import './Home.css';

export interface HomeProps {
    // eslint-disable-next-line @typescript-eslint/ban-types
    store:any;
    project?:Project
}

export interface FileExt {
    file?:File;
    loadFile:()=>void;
    clearFile:()=>void;
}

interface Project {
    name?: string;
    methods?: Method[]
}

interface Method {
    name?:string;
    path:string;
    httpMethod:string;
}


export const ProjectPage = observer((props:HomeProps):React.ReactElement=>{
    const mockProject:Project = {
        name:'unnamed'
    } 
    const methods:Method[] = []
    const {store,project=mockProject} = props;
    
    const file = store.file as File;
    if(file!==undefined){
        file.text().then((s)=>{
            let parsedFile
            if(/.yaml$/.test(file.name)){
                const yaml = YAML.parse(s);
                parsedFile =   fileToProject(yaml);                
            }
            if(/.json$/.test(file.name)){
                const json = JSON.parse(s);
                parsedFile= fileToProject(json);
            }
            if(parsedFile!==undefined){
                parsedFile.methods&&methods.push(...parsedFile.methods)
            }
            console.log(methods)
        })
    }


    
    return(<div>
             <header className="project-page__header" >{project.name}
             <button className="project-page__header-button" onClick={store.clearFile}>Clear file</button>
             </header>
             <section>
                 <form
                    onSubmit={() => {
                        //
                    }}
                    // validate={() => {
                    //     return {};
                    // }}
                    >
                            <Dropzone
                                accept=".json, .yaml"
                                multiple={false}
                                onDrop={([f]) => {
                                    // console.log(f);
                                    store.loadFile(f)
                                    // if (f.type === 'application/json') {
                                    //     readAsText(f)
                                    //         .catch((err) => {
                                    //             return Promise.reject(err);
                                    //         })
                                    //         .then((event) => {
                                    //             if (event.target === null) {
                                    //                 return Promise.reject(
                                    //                     new Error('unexpected null target in ProgressEvent'),
                                    //                 );
                                    //             }
                                    //             if (typeof event.target.result !== 'string') {
                                    //                 return Promise.reject(
                                    //                     new Error(
                                    //                         `unexpected file content type ${typeof event.target
                                    //                             .result}`,
                                    //                     ),
                                    //                 );
                                    //             }

                                    //             const content = event.target.result;

                                    //             setFile(JSON.parse(content));
                                    //         });
                                    // } else if (/(\.yaml)$/.test(f.name)) {
                                    //     // const file = fs.readFileSync(f.path, 'utf8');
                                    //     // YAML.parse(file);
                                    // } else {
                                    //     throw new Error('file type not supported');
                                    // }
                                }}
                            >
                                {({ getRootProps, getInputProps }) => (
                                    <section>
                                        <div {...getRootProps({ className: 'dropzone' })}>
                                            <input {...getInputProps()} />
                                            <p>Загрузить</p>
                                            {/* {!file && <p>Загрузить файл</p>}
                                            {file && <p>Загрузить другой файл</p>} */}
                                        </div>
                                    </section>
                                )}
                            </Dropzone>

                            {/* <Field
                                key="addingUserName"
                                name="addingUserName"
                                validate={(value) => {
                                    if (
                                        value == '123' ||
                                        value == undefined ||
                                        value == '' ||
                                        users.filter((val) => val == value).length === 0
                                    ) {
                                        return 'данный пользователь уже добавлен';
                                    }
                                    return null;
                                }}
                            >
                                {({ input }) =>  */}
                                <input  type="text" placeholder="Укажите пользователя" />

                            {/* }</Field> */}
                            <div>
                                {/* <button
                                    type="button"
                                    // disabled={!values.addingUserName}
                                    // onClick={() => {
                                    //     setUsers([...users, values.addingUserName]);
                                    //     form.resetFieldState('addingUserName');
                                    // }}
                                >
                                    Добавить пользователя
                                </button>
                                <button
                                    type="button"
                                    // disabled={!values.addingUserName}
                                    // onClick={() => {
                                    //     setUsers([...users].filter((item) => item !== values.addingUserName));
                                    //     form.resetFieldState('addingUserName');
                                    // }}
                                >
                                    Удалить пользователя
                                </button> */}
                            </div>
                            {/* {methods &&
                                [...methods].map((method) => (
                                    <MethodForm
                                        users={[]}
                                        method={method[0]}
                                        httpMethods={method[1]}
                                        key={method.toString()}
                                    />
                                ))}
                            <button type="button">Сгенерировать rbac файл</button> */}
                        </form>
                    {/* )}
                /> */}
            </section>
            <footer></footer>
    </div>)
});

interface ParsedJson {
    paths:{[key:string]:any}
    [key:string]:any
}

function fileToProject(parsedJson?: ParsedJson): Project {
    
    if (parsedJson == undefined || parsedJson.paths == undefined) {
        throw new Error("OpenAPI file incorrect. can't find 'paths' field")
    }

    const paths = Object.keys(parsedJson.paths)

    const methods:Method[] = []
    paths.map((path)=>{
        const httpMethods = Object.keys(parsedJson.paths[path])
        httpMethods.map((h)=>{
            methods.push({path,httpMethod:h})
        })
    })

    const res = {
        name: parsedJson.info.title,
        methods: methods
    }

    return res
}


// function readAsText(file: File): Promise<ProgressEvent<FileReader>> {
//     return new Promise((resolve, reject) => {
//         const fileReader = new FileReader();
//         fileReader.onload = resolve;
//         fileReader.onerror = reject;
//         fileReader.readAsText(file);
//     });
// }

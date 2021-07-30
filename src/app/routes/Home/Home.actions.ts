import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
const ipcRenderer = window.require('electron').ipcRenderer;
const fs = window.require('fs');
const path = window.require('path');

// interface ActionCreators {
//     [key: string]: (...args: any[]) => any;
// }

// /**
//  * Receives an object with Redux action creators and returns a union of all action types.
//  */
// export type InferActions<T extends ActionCreators> = ReturnType<T[keyof T]>;

export const uploadFile =
    (params?: any): AsyncAction<any> =>
    (dispatch): void => {
        ipcRenderer.send('home@upload-file/request', params);
        ipcRenderer.on('home@upload-file/reply', (event, arg) => {
            const rawdata = fs.readFileSync(path.resolve(arg));
            const file = JSON.parse(rawdata);
            dispatch({ type: 'home@upload-file', payload: file });
        });
    };

// const _ = GetReturnType<uploadFile()>
// type PlainAction = typeof uploadFile;
type AsyncAction<T> = ThunkAction<T, AppStateWithPage, any, Action<any>>;

export interface AppStateWithPage {
    paymentCalendar?: PageState;
}

// function commitOrdersNext(
//     entities: Entities<OrderExtrable>,
// ): SimpleAction<ActionType.COMMIT_ORDERS_NEXT, Entities<OrderExtrable>> {
//     return createAction(ActionType.COMMIT_ORDERS_NEXT, entities);
// }

// const _ = {
//     //actions
// };

// type PlainAction = InferActions<typeof _>;
// type AsyncAction<T = Promise<void>> = ThunkAction<T, AppStateWithPage, any, PlainAction>;

// export const uploadFile =
//     (json: File): AsyncAction<Promise<SubmissionErrors | undefined>> =>
//     (dispatch, getState): Promise<SubmissionErrors | undefined> => {
//         return;
//     };

export interface PageState {
    file?: Record<string, unknown>;
}

interface SyncAction<T> {
    type: string;
    payload?: T;
}

export const HomeReducer = (state: PageState = {}, action: SyncAction<any>): PageState => {
    switch (action.type) {
        case 'home@upload-file': {
            return { ...state, file: action.payload };
        }
        default:
            return state;
    }
};

import { TODO, IN_PROGRESS, DONE } from "./config";

export type Column = TODO | IN_PROGRESS | DONE;

export type AddProjectActionType = (project: string) => { payload: string };

export type MoveProjectActionType = (
  {
    from: Column,
    to: Column,
    dragIndex: number,
    hoverIndex: number
  }
) => {
  payload: {
    from: string,
    to: string,
    dragIndex: number,
    hoverIndex: number
  }
};

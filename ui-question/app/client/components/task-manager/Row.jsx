/* @flow */
/* eslint-disable react/no-find-dom-node */
import React from 'react';
import { compose } from 'recompose';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import style from './style.scss';

export const Row = (
  {
    value,
    connectDragSource,
    connectDropTarget,
    isDragging
  }: {
    value: string,
    connectDragSource: Function,
    connectDropTarget: Function,
    isDragging: boolean
  }
) => {
  const opacity = isDragging ? 0 : 1;

  return connectDragSource(
    connectDropTarget(
      <div className={style.Row} style={{ opacity }}>{value}</div>
    )
  );
};

export const enhance = compose(
  DropTarget(
    'Row',
    {
      hover(props, monitor, component) {
        // copy from http://react-dnd.github.io/react-dnd/examples-sortable-simple.html
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
          return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = findDOMNode(
          component
        ).getBoundingClientRect();

        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom -
          hoverBoundingRect.top) /
          2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the top
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;

        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%

        // Dragging downwards
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
          return;
        }

        // Dragging upwards
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
          return;
        }

        // Time to actually perform the action
        props.moveProject({
          from: props.tag,
          to: props.tag,
          dragIndex,
          hoverIndex
        });

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
      }
    },
    connect => ({
      connectDropTarget: connect.dropTarget()
    })
  ),
  DragSource(
    'Row',
    {
      beginDrag({ tag, index }) {
        return { tag, index };
      }
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    })
  )
);

export default enhance(Row);

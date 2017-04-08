/* @flow */
/* eslint-disable react/no-find-dom-node */
import React from 'react';
import { DropTarget } from 'react-dnd';
import { findDOMNode } from 'react-dom';
import ProjectStats from './ProjectStats';
import Row from './Row';
import style from './style.scss';

export class Column extends React.Component {
  props: {
    tag: string,
    rowsData: Array<{ id: number, name: string }>,
    moveProject: Function,
    connectDropTarget: Function
  };

  render() {
    const { tag, rowsData, moveProject, connectDropTarget } = this.props;

    return connectDropTarget(
      <div className={style.Column}>
        <div className={style.ColumnHeader}>
          <h3>{tag}</h3>
          <ProjectStats numOfProject={rowsData.length} />
        </div>
        <div className={style.ColumnBody}>
          {rowsData.map((rowData, index) => (
            <Row
              key={rowData.id}
              index={index}
              tag={tag}
              value={rowData.name}
              moveProject={moveProject}
            />
          ))}
        </div>
      </div>
    );
  }
}

export const enhance = DropTarget(
  'Row',
  {
    hover(props, monitor, component) {
      const item = monitor.getItem();

      if (item.tag !== props.tag) {
        props.moveProject({
          from: item.tag,
          to: props.tag,
          dragIndex: item.index,
          hoverIndex: 0
        });

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        item.index = 0;
        item.tag = props.tag;
      }
    }
  },
  connect => ({
    connectDropTarget: connect.dropTarget()
  })
);

export default enhance(Column);

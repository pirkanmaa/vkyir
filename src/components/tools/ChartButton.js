import React, { Component } from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import EditorPieChart from 'material-ui/svg-icons/editor/pie-chart';

const style = {
    marginBottom: 10
}

export default class ShareButton extends Component {
    render() {
        return (
            <FloatingActionButton style={style}>
                <EditorPieChart />
            </FloatingActionButton>
        );
    }
}
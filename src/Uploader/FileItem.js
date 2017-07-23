/**
 * @file File List Item
 * @author leon <ludafa@outlook.com>
 */

import {Component, DataTypes} from 'san';
import {create} from '../common/util/cx';
import {LinearProgress} from '../Progress';
import IconButton from '../Button/IconButton';

import formatFileSize from './formatFileSize';

const cx = create('file-item');

export default class FileListItem extends Component {

    static template = `
        <div class="{{className}}">
            <div class="${cx.getPartClassName('name')}" title="{{name}}">{{name}}</div>
            <div
                s-if="size > 0"
                class="${cx.getPartClassName('size')}">
                {{formattedFileSize}}
            </div>
            <sm-icon-button
                variants="file-item danger"
                on-click="remove">
                clear
            </sm-icon-button>
            <sm-linear-progress
                s-if="status === 'uploading'"
                mode="determinate"
                value="{{progress}}" />
        </div>
    `;

    static components = {
        'sm-linear-progress': LinearProgress,
        'sm-icon-button': IconButton
    };

    static computed = {
        className() {
            return cx(this).build();
        },
        formattedFileSize() {
            let size = this.data.get('size');
            return size ? formatFileSize(this.data.get('size')) : '';
        }
    };

    static dataTypes = {
        name: DataTypes.string.isRequired,
        url: DataTypes.string,
        status: DataTypes.oneOf(['uploading', 'uploaded', 'error'])
    };

    initData() {
        return {
            status: 'uploaded'
        };
    }

    remove() {
        this.fire('remove');
    }

}

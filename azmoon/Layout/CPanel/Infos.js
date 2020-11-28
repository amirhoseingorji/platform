import React, { Component } from 'react';
import Table from '../../Componnet/Table';
export default class Infos extends Component {
    render = () => {
        this.config = {
            cols: {
                id: { text: ""},
                "`id`": { text: "شناسه", dataIndex: "id" ,width:60},
                title: { text: "نام", flex: 1},
               text: { text: "متن", btn:"htmlbtn" },
                src: { text: "تصویر", btn: "imgbtn" },
                file: { text: "فایل", btn: "multy" },
                last:{text:"آخرین ویرایش",btn:"date"}
            },
            0:{status:1},
            filter:{hidden:true},
            from: "pages",
            title: "صفحات متن",
            icon: "info",
            history : this.props.history
        }
        return <Table  {...this.config} />
    }
}
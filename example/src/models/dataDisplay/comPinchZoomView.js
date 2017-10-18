// import { submit, query } from '../services/index';
// import { delay } from 'react-wxeap';

export default {

    namespace: 'comPinchZoomView',

    state: {
        fblHtmlDisplay: `<div id="renderFormData" style="height:auto;overflow:hidden"><div id="renderFormData" style="height:auto;overflow:hidden; padding-bottom:20px;padding-top:20px"><br>
        <p class="STYLE3" align="center">请&nbsp;&nbsp;假&nbsp;&nbsp;申&nbsp;&nbsp;请&nbsp;&nbsp;表</p><p class="STYLE3" align="center"><span style="font-size: 16px;">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;申请时间:</span><span id="FlaADateDisplay" runat="server">2017-10-09 10:32</span><input id="FlaADate" datatype="datetime" runat="server" dataname="申请时间" tag="Field" ok="ok" style="display: none;"></p><table border="0" cellspacing="1" width="648" bgcolor="#000000" align="center">
        <tbody>
        
        <tr>
        <td class="STYLE2" bgcolor="#ffffff" height="28" width="126"><span class="STYLE2">申请人</span></td>
        <td class="STYLE1" bgcolor="#ffffff" height="28" width="216">&nbsp;<span id="FlaAEmpNameDisplay" runat="server">试用</span><input style="width: 206px; height: 21px; display: none;" id="FlaAEmpName" size="27" runat="server" dataname="申请人" tag="Field" ok="ok"></td>
        <td class="STYLE2" bgcolor="#ffffff" height="28" width="84">部门</td>
        <td class="STYLE1" bgcolor="#ffffff" height="28" width="209"><span id="FlaADptNameDisplay" runat="server">办公室</span><input style="width: 199px; height: 21px; display: none;" id="FlaADptName" size="14" runat="server" dataname="申请部门" tag="Field" ok="ok"></td></tr>
        <tr>
        <td class="STYLE2" bgcolor="#ffffff" height="28">请假天数</td>
        <td class="STYLE1" bgcolor="#ffffff" height="28" colspan="3">&nbsp;<span id="Fld214Display" runat="server">1.00</span><input tag="Field" type="text" datatype="number" dataname="天数" id="Fld214" rows="6" cols="59" value="" runat="server" ok="ok" style="display: none;"></td></tr>
        <tr>
        <td class="STYLE2" bgcolor="#ffffff" height="52">请假原因</td>
        <td class="STYLE1" bgcolor="#ffffff" height="52" valign="top" colspan="3">&nbsp;<span id="Fld215Display" runat="server">5555555555</span><textarea tag="Field" style="width: 492px; height: 129px; display: none;" id="Fld215" value="" dataname="事由" runat="server" ok="ok"></textarea></td></tr>
        <tr>
        <td class="STYLE2" bgcolor="#ffffff" height="28">请假时间</td>
        <td class="STYLE1" bgcolor="#ffffff" height="28" colspan="3">&nbsp;<span id="Fld217Display" runat="server">2017/10/1 0:00:00</span><input tag="Field" type="text" datatype="datetime" dataname="开始时间" id="Fld217" value="" runat="server" ok="ok" style="display: none;">--<span id="Fld218Display" runat="server">2017/10/1 0:00:00</span><input tag="Field" type="text" datatype="datetime" dataname="归来时间" id="Fld218" value="" runat="server" ok="ok" style="display: none;"></td></tr>
        <tr>
        <td class="STYLE2" bgcolor="#ffffff" height="80">部门经理批示<br></td>
        <td class="STYLE1" bgcolor="#ffffff" height="80" valign="top" colspan="3">&nbsp;<span id="Fld95Display" runat="server"></span><textarea style="width: 492px; height: 129px; display: none;" id="Fld95" rows="6" cols="59" runat="server" dataname="部门经理批示" tag="Field" ok="ok"></textarea></td></tr>
        <tr>
        <td class="STYLE2" bgcolor="#ffffff" height="28">批示时间</td>
        <td class="STYLE1" bgcolor="#ffffff" height="28" colspan="3">&nbsp;</td></tr>
        <tr>
        <td class="STYLE2" bgcolor="#ffffff" height="80">总经理批示</td>
        <td class="STYLE1" bgcolor="#ffffff" height="80" valign="top" colspan="3">&nbsp;<span id="Fld96Display" runat="server"></span><textarea style="width: 492px; height: 115px; display: none;" id="Fld96" rows="6" cols="60" runat="server" dataname="总经理批示" tag="Field" ok="ok"></textarea></td></tr>
        <tr>
        <td class="STYLE2" bgcolor="#ffffff">销假时间</td>
        <td class="STYLE1" bgcolor="#ffffff" height="28" colspan="3">&nbsp;</td></tr></tbody></table>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 备注:请假一天以内,部门经理批示即可,一天以上,需总经理批示.</p>
        <style type="text/css">
        <!--
        .STYLE2 {font-size: 16px;
        text-align:center}
        -->
        .STYLE1 {font-size: 16px;}
        .STYLE3 {
            font-size: 24px;
            font-weight: bold;
        }
        </style></div></div>`,
        
    },

    subscriptions: {
        setup({ history }) {
            return history.listen(() => {
                // if (pathname === '/') {}
            });
        },
    },

    effects: {
    },

    reducers: {
        save(state, action) {
            return { ...state, ...action.payload };
        },
    },

    // 是否自动恢复state
    // persist: true
};
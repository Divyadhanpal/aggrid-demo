// frameworks & plug-ins
import React, { Component, useEffect} from 'react'

// api & actions
import { showLoading, hideLoading } from './actions'




const TvpcTable = async() => import('./ag-grid')
//const TvpcsidePanel = asyncComponent (() => import('@/components/TvpcsidePanel'))
const panelld = 'tvpcsidePanel'



   class App extends Component {
        constructor (props) {
        super (props)
        this. sidePanelRef = React.createRef()
        this.state = {
        activeTab: 0,
        initialvalues: {},
        sidePanelMaxWidth: '640px',
        curPaymentMainInfo:{
        uuid:'',
        ptsstatus:'',
        messageType:'',
        originatedsystem:'',
        },
        showDropDown: true,
        updateInfo: null,
        random: 0,
        token:''
    }
}
        async componentDidMount() {
        
       
        window. addEventListener ("message", this.receiveMessage)
        await this.init()
        //timerRefresh()
        }// refresh payment list regularly
        componentWillUnmount(){
        const { closesidePanelBox } = this.props
        closesidePanelBox()
        // clear refresh payment list regularly
        }
        receiveMessage=(e)=>{
        console.log(e,
        "received")
        this.setState({token: e.data});
   }
        // page initialization request
        init = async () => {
        const { showLoadingBox, hideLoadingBox } = this.props
        showLoadingBox()
 
        // await getLegalEntityList()
        await this.getTableData()
        hideLoadingBox()
        }
       
      
       
        // getTableData = async () => {
        // const { showLoadingBox, hideLoadingBox, getPaymentAllList } = this.props
        // showLoadingBox()
        // await getPaymentAllList()
        // hideLoadingBox()
        // }
 
// check whether the side panel Form Data has chaneed before action
handleBeforeAction = async ({ type, selectData }) => {
const { sidePanelVisible } = this.props
const {
curPaymentMainInfo: { uuid },
}
= this.state
let result = true
// if side panel close no need check
if (!sidePanelVisible) return result
let obj = null
switch (type) {

case 'doubleClick':
{
let text = 'new'
if (uuid) {
text = uuid === selectData.uuid ? "same" : 'other'
}
obj = {
text:'open ${text}, record details',
type,
}
break
}
default:
break
}
if (!obj) return result
// trigger AdminSidePanel method
result = await this.sidePanelRef.current.triggerModalWarning(obj)
// if result is true - means side panel data no change
return result
}

// click item from table
rowSelect = async (selectData) => {
const  {
// showloadingBox,
hideLoadingbox,
userPermission,
getPaymentDataDetail,
openSidePanelbox,
closeSecondaryBox,
} = this. props
const canSelect = await this.handleBeforeAction({
type: "doubleclick",
selectData,
})
if (!canSelect) return
// showLoadingBox()
// const data = {
// data: {
// uuid: selectData,uuid,
// status: selectData,ptsStatus,
// },
// role: userPermission.SCREEN,
// }
//await getPaymentDataDetail(data)

this.setState(
//     (prevState) = ({
//     curPaymentMainInfo:{
//     uuid: selectData.uuid,
//     messageType: selectData.messageType,
//     criginated5ystem: selectData.originatedSystem||'OTHER',
//     ptsStatus: selectData.ptsStatus,
//     },
//     updateInfo:{
//     time: selectData.updatedTime,
//     name: selectData.updateday,
//     },
//     random:
//     prevState.curPaymentMainInfo.uuid &&
//     prevState.curPaymentMainInfo.uuid
//     === selectData.uuid
//     ? Date. now() :
//     prevState.random,
// }),
()=>{
    closeSecondaryBox()
   // hideLoadingBox()
   // openSidePanelBox()
})}
    render() {
    const {
    activeTab,
    curPaymentMainInfo: { messagelype, originatedSystem, uuid, ptsStatus },
    random,
    sidePanelMaxlidth,
    updateInfo,
    initialvalues,
    showDropDown,
    token
    }
    = this.state
    const {
    sidePanelvisible,
    loading,
    userPermission,
    searchkeyGroup,
     } = this.props
    
    return (
    <div
    // className={`${sidePanelVisible?'show-side-panel':''}`}
    sidePanelVisible = {sidePanelvisible} 
    maxWidth={'640px'} >
   
    <div className="ev-window body flex-col pr-5 p1-5">
   <div className="ev-page">
    <div className="ev-page body flex-col overflow-hidden">
    {
        {
    0: (
    <>
    <div className="flex-row flex overflow-hidden">
    <section className="ev-aggrid flex scroll h-100 grid-wrapper">
    <TvpcTable onSelect={this.rowSelect} />
    </section>
    
    </div>
    </>
    ),
    }[activeTab]
}
    </div>
    </div>
   </div>
    </div>
    )
    }
}

export default App
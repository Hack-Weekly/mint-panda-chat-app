import './MessagesPage.css'
export default function Messages() {
    return (
        <div id="messages-page">
            <div id='messages-page-header'>
                <h1>Messages</h1>
                <img id='new-message-icon' className='messages-icon' src='/images/pencil.png'></img>
            </div>
            <div id="messages-search">
                <img className='messages-icon' src='/images/search.png'></img>
                <input id='search-input' placeholder='Search'></input>
            </div>
            <div id='messages-content'>
                {/* get users */ }
            </div>
        </div>
    )
}
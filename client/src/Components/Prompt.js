import React from 'react';
import './component css/Prompt.css'

function Prompt() {


    return (
        <div className="password-prompt">
            <div className="password-prompt-dialog">
                <h2>put your password</h2>
                <p>the inclusion of technical staff and supervisors adds depth</p>
                <h4>Your password</h4>
                <input type="password" placeholder='*****************'/>
                <button>Save</button>
            </div>
        </div>
    );
}

export default Prompt;

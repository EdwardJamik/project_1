import React from 'react';
import './tag.scss'

const crown = [
    <svg key='crown' fill="#fff" height="16px" width="16px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <polygon points="494.933,68.267 375.467,187.733 256,68.267 136.533,187.733 17.067,68.267 0,68.267 0,443.733 512,443.733 512,68.267 "></polygon>
    </svg>
]

const hot = [
    <svg key='hot' viewBox="0 0 24 24" height="16px" width="16px" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.926 20.574a7.26 7.26 0 0 0 3.039 1.511c.107.035.179-.105.107-.175-2.395-2.285-1.079-4.758-.107-5.873.693-.796 1.68-2.107 1.608-3.865 0-.176.18-.317.322-.211 1.359.703 2.288 2.25 2.538 3.515.394-.386.537-.984.537-1.511 0-.176.214-.317.393-.176 1.287 1.16 3.503 5.097-.072 8.19-.071.071 0 .212.072.177a8.761 8.761 0 0 0 3.003-1.442c5.827-4.5 2.037-12.48-.43-15.116-.321-.317-.893-.106-.893.351-.036.95-.322 2.004-1.072 2.707-.572-2.39-2.478-5.105-5.195-6.441-.357-.176-.786.105-.75.492.07 3.27-2.063 5.352-3.922 8.059-1.645 2.425-2.717 6.89.822 9.808z" fill="#fff"></path>
    </svg>
]

const Tag = ({type}) => {

    return (
        <div className={`tag ${type === 'vip' ? 'vip' : type === 'hot' ? 'hot' : 'other'}`}>
            {type === 'vip' &&
                <>
                    <div className="icon">
                        {crown}
                    </div>

                    <div className="text_tag">Vip</div>

                </>
            }
            {type === 'hot' &&
                <>

                    <div className="icon">
                        {hot}
                    </div>

                    <div className="text_tag">Hot</div>

                </>
            }
            {type !== 'vip' && type !== 'hot' &&
                <>
                    <div className="text_tag other">{type}</div>
                </>
            }
        </div>
    );
};

export default Tag;
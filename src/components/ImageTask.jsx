import React from 'react'

function ImageTask({ imgStart, imgEnd }) {
    return (
        <>
            <div className="flex flex-row m-2 gap-2">
                <div className="flex flex-col justify-between">
                    <img src={imgStart} width={200} height={200} />
                    <div className="flex justify-center">
                        {imgEnd !== "NONE" ? (
                            <h2>ก่อน</h2>) : null}
                    </div>
                </div>
                {imgEnd !== "NONE" ? (
                    <div className="flex flex-col justify-between">
                        <img src={imgEnd} width={200} height={200} />
                        <div className="flex justify-center">
                            <h2>หลัง</h2>
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    )
}

export default ImageTask
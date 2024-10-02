/* eslint-disable react/prop-types */


const Address = ({ data, isChecked, addressId, handleCheckboxChange }) => {


    const addressData = `${data?.country}-${data?.state}`
    return (
        <div className={`bg-white flex items-center gap-5 ${isChecked ? `border border-black` : `border`} hover:border hover:border-black border border-transparent  cursor-pointer  rounded-lg p-4`} >
            <div className="flex">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={(e) => handleCheckboxChange(e, data._id)}
                    value={addressId}
                />
            </div>
            <div className="">
                <p>
                    Address : {addressData}
                </p>
                <p className="">Zipcode : {data?.zipcode}</p>
            </div>

        </div >
    )
}

export default Address
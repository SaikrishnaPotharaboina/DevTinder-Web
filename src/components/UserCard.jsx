

function UserCard({ user }) {
    const { firstName, lastName, age, gender, photoUrl, about } = user;
    return (
        <div className="my-20  flex justify items-center" >
            <div className="card bg-base-300 w-85 shadow-sm ">
                <figure>
                    <img
                        src={photoUrl}
                        alt="photo"

                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{firstName + " " + lastName}</h2>
                    {age && gender && <p>{age + ", " + gender}</p>}
                    <p>{about}</p>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary">Ignore</button>
                        <button className="btn btn-secondary">Intersted</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserCard;

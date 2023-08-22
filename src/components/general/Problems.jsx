import { problems_attend } from "../../helpers/problems_attend"

const Problems = () => {

    return (
        <article className="">
            <h1>Problemas que abordo</h1>
                <div className="row p-2">
                {problems_attend.map((attend, index) => (
                    <div className="p-0 mx-0 col-12 col-lg-4"><li>{attend}</li></div>
                ))}
                </div>
        </article>

    )
}

export default Problems
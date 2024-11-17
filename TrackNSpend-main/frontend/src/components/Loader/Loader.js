import { RotatingLines } from "react-loader-spinner";

const Loader = () => {
    return (
        <>
            <div className="overlay">
                <RotatingLines
                    strokeColor= "#3C3D37"
                    strokeWidth="4"
                    animationDuration="0.75"
                    width="72"
                    visible={true}
                    />
            </div>
        </>
    )
}

export default Loader;
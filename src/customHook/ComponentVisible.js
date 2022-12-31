import { useEffect, useRef, useState } from "react";

function useComponentVisible(initialIsVisible) {
    const [isComponentVisible, setIsComponentVisible] = useState(
        initialIsVisible
    );
    const ref = useRef(null);


    const handleClickOutside = event => {
        if (ref.current && !ref.current.contains(event.target)) {
            console.log(isComponentVisible)
            setIsComponentVisible(false);
        }
    };

    useEffect(() => {

        document.addEventListener("click", handleClickOutside, true);
        return () => {
   
            document.removeEventListener("click", handleClickOutside, true);
        };
    });

    return { ref, isComponentVisible, setIsComponentVisible };
}
export default useComponentVisible;
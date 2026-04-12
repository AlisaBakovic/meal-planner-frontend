function NavButton({ children, onClick}) {
    return ( <button onClick={onClick} style={{ fontFamily: "Open Sans" }} 
                className="relative text-gray uppercase text-[16px] leading-[40px] 
                w-full max-w-[200px] mx-auto block text-center whitespace-nowrap 
                transition-all duration-[280ms] ease-in-out tracking-[0px] 
                hover:tracking-[5px] before:content-[''] before:absolute before:left-1/2
                before:-translate-x-1/2 before:top-0 before:w-0 before:border-t before:border-gray
                before:transition-all before:duration-[350ms] after:content-[''] after:absolute 
                after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:w-0 after:border-b 
                after:border-gray after:transition-all after:duration-[350ms] hover:before:w-[70%] 
                hover:after:w-[70%]"
                >{children}</button>
            );
}

export default NavButton;
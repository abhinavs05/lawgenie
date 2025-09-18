const Navbar = () => {
    return (
        <div className="flex flex-row justify-between items-center my-2 px-8 
                        fixed top-0 left-0 w-full z-50 bg-transparent">
            <div className="text-white font-bold text-xl">Lawgenie</div>
            <div className="text-lg">
                <button className="mx-2 text-white hover:underline hover:decoration-yellow-500 hover:underline-offset-8">About</button>
                <button className="mx-2 text-white hover:underline hover:decoration-yellow-500 hover:underline-offset-8">Use Cases</button>
                <button className="mx-2 text-white hover:underline hover:decoration-yellow-500 hover:underline-offset-8">Resources</button>
                <button className="mx-2 text-white hover:underline hover:decoration-yellow-500 hover:underline-offset-8">Contact</button>
            </div>
        </div>
    );
};
export default Navbar;

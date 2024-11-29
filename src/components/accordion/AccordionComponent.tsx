interface AccordionProps {
    title: React.ReactNode;
    children: React.ReactNode;
    isOpen: boolean;
    toggleOpen: () => void;
}

const Accordion: React.FC<AccordionProps> = ({ title, children, isOpen, toggleOpen }) => {
    return (
        <div className="border-b border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden">
            <h2>
                <button
                    type="button"
                    className="bg-gray-900 flex items-center justify-between w-full p-4 font-medium text-white dark:text-gray-400 border-b border-gray-200 dark:border-gray-700 rounded-t-2xl focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-600 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-700 gap-4"
                    onClick={toggleOpen}
                    aria-expanded={isOpen}
                >
                    <span className="flex items-center text-lg">{title}</span> 
                    <svg
                        className={`w-6 h-6 transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M9 5 5 1 1 5"
                        />
                    </svg>
                </button>
            </h2>
            <div className={`transition-all duration-300 ${isOpen ? 'max-h-screen' : 'max-h-0 overflow-hidden'}`}>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-b-2xl">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Accordion;

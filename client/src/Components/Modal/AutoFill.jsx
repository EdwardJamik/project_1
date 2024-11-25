import React, { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const EmailAutocomplete = ({
                               placeholder = "Enter your email",
                               onEmailChange,
                               initialValue = '',
                               maxWidth = 340
                           }) => {
    const [userData, setUserData] = useState({ mail: initialValue });
    const [error, setError] = useState(null);
    const [errorType, setErrorType] = useState(null);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);
    const containerRef = useRef(null);

    const allDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com"];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        const handleResize = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                if (dropdownRef.current) {
                    const shouldDropUp = window.innerHeight - rect.bottom < 200;
                    dropdownRef.current.style.bottom = shouldDropUp ? '100%' : 'auto';
                    dropdownRef.current.style.top = shouldDropUp ? 'auto' : '100%';
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleInputChange = (event) => {
        const value = event.target.value;

        if (errorType === 'mail') {
            setError(null);
            setErrorType(null);
        }

        setUserData({ ...userData, mail: value });
        onEmailChange?.(value);

        if (value?.includes("@")) {
            const [username, enteredDomain] = value.split("@");
            const filtered = allDomains
                .filter((domain) => domain.toLowerCase().startsWith((enteredDomain || '').toLowerCase()))
                .map((domain) => `${username}@${domain}`);
            setFilteredOptions(filtered);
            setIsOpen(filtered.length > 0);
            setSelectedIndex(-1);
        } else {
            setFilteredOptions([]);
            setIsOpen(false);
        }
    };

    const handleOptionClick = (option) => {
        setUserData({ ...userData, mail: option });
        onEmailChange?.(option);
        setIsOpen(false);
        setFilteredOptions([]);
        inputRef.current?.focus();
    };

    const handleKeyDown = (event) => {
        if (!isOpen) return;

        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                setSelectedIndex(prev =>
                    prev < filteredOptions.length - 1 ? prev + 1 : prev
                );
                break;
            case 'ArrowUp':
                event.preventDefault();
                setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
                break;
            case 'Enter':
                event.preventDefault();
                if (selectedIndex >= 0) {
                    handleOptionClick(filteredOptions[selectedIndex]);
                }
                break;
            case 'Escape':
                setIsOpen(false);
                break;
            default:
                break;
        }
    };

    const handleClear = (e) => {
        e.stopPropagation();
        setUserData({ ...userData, mail: '' });
        setFilteredOptions([]);
        setIsOpen(false);
        onEmailChange?.('');
        inputRef.current?.focus();
    };

    return (
        <div
            ref={containerRef}
            className={`relative w-full max-w-[${maxWidth}px]`}
            style={{ maxWidth }}
        >
            <div className="relative">
                <Input
                    ref={inputRef}
                    type="email"
                    value={userData.mail}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => {
                        if (filteredOptions.length > 0) setIsOpen(true);
                    }}
                    placeholder={placeholder}
                    className={`h-10 px-4 my-3.5 text-sm ${
                        (!userData.mail && error) || errorType === 'mail'
                            ? 'border-red-500 border-2'
                            : ''
                    }`}
                />
                {userData.mail && (
                    <button
                        onClick={handleClear}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                        aria-label="Clear input"
                    >
                        ✕
                    </button>
                )}
            </div>

            {isOpen && (
                <Card
                    ref={dropdownRef}
                    className="absolute left-0 w-full mt-1 max-h-[200px] overflow-y-auto z-50 shadow-lg"
                >
                    <div className="p-1">
                        {filteredOptions.map((option, index) => (
                            <div
                                key={index}
                                className={`px-3 py-2 cursor-pointer rounded transition-colors
                  ${index === selectedIndex
                                    ? 'bg-[rgba(198,80,126,0.4)] text-white'
                                    : 'hover:bg-[rgba(198,80,126,0.4)] hover:text-white'
                                }`}
                                onClick={() => handleOptionClick(option)}
                                onMouseEnter={() => setSelectedIndex(index)}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                </Card>
            )}
        </div>
    );
};

export default EmailAutocomplete;
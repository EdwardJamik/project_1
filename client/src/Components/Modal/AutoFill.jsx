import React, {useEffect, useState} from "react";
import { useTranslation } from "react-i18next";

const EmailAutofill = ({value, onChange, domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "ukr.net", "i.ua", "icloud.com", "example.com"]}) => {
    const [suggestions, setSuggestions] = useState([]);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const { t } = useTranslation();
    const { i18n } = useTranslation();
    const currentLanguage = i18n.language;
    const [data, setData] = useState(null);
    const basePath = window.location.pathname.split('/').slice(0, -1).join('/') || '/';

    useEffect(() => {
        fetch(`${basePath ? `${basePath}/` : ''}/autoFill.json`)
            .then(response => response.json())
            .then(data => {
                if(currentLanguage && data[0][currentLanguage]){
                    setData(data[0][currentLanguage])
                } else {
                    setData(data[0]['de'])
                }

            });
    }, []);

    const calculateSimilarity = (domain, input) => {
        let commonChars = 0;
        for (let i = 0; i < Math.min(domain.length, input.length); i++) {
            if (domain[i] === input[i]) {
                commonChars++;
            } else {
                break;
            }
        }
        return commonChars;
    };

    const handleChange = (e) => {
        const inputValue = e.target.value;
        onChange(inputValue.replace(/\s/g, ''));
        setHighlightedIndex(-1);

        if (inputValue.includes("@")) {
            const [localPart, domainPart] = inputValue.split("@");
            const filteredDomains = data
                .filter((domain) => domain.includes(domainPart))
                .sort((a, b) => calculateSimilarity(b, domainPart) - calculateSimilarity(a, domainPart))
                .slice(0, 5)
                .map((domain) => `${localPart}@${domain}`);

            setSuggestions(filteredDomains);
        } else {
            setSuggestions([]);
        }
    };

    const handleFocus = () => {
        if (value && !value.includes("@")) {
            const initialSuggestions = data.slice(0, 5).map((domain) => `${value}@${domain}`);
            setSuggestions(initialSuggestions);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            setHighlightedIndex((prev) =>
                prev < suggestions.length - 1 ? prev + 1 : 0
            );
        } else if (e.key === "ArrowUp") {
            setHighlightedIndex((prev) =>
                prev > 0 ? prev - 1 : suggestions.length - 1
            );
        } else if (e.key === "Enter" && highlightedIndex >= 0) {
            onChange(suggestions[highlightedIndex]);
            setSuggestions([]);
        } else if (e.key === "Escape") {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        onChange(suggestion);
        setSuggestions([]);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setSuggestions([]);
        }, 100);
    };

    return (
        <div style={{ position: "relative", width: "100%" }}>
            <input
                type="text"
                value={value || ""}
                onChange={handleChange}
                onFocus={handleFocus}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                className="email_input"
                placeholder={t("input_placeholder_mail")}
                style={{ width: "100%", padding: "8px" }}
            />
            {suggestions.length > 0 && (
                <ul
                    className="suggestion-list"
                    style={{
                        position: "absolute",
                        bottom: "calc(76% + 6px)",
                        left: 0,
                        right: 0,
                        background: "#fff",
                        border: "1px solid #ccc",
                        margin: 0,
                        padding: 0,
                        listStyle: "none",
                        zIndex: 1000,
                        animation: "fadeIn 0.3s ease-in-out",
                    }}
                >
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={index}
                            style={{
                                padding: "8px",
                                cursor: "pointer",
                                backgroundColor:
                                    index === highlightedIndex ? "#f0f0f0" : "#fff",
                                borderBottom: "1px solid #eee",
                            }}
                            onMouseEnter={() => setHighlightedIndex(index)}
                            onClick={() => handleSuggestionClick(suggestion)}
                        >
                            {suggestion}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default EmailAutofill;

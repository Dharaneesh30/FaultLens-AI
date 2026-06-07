from app.services.preprocess import clean_requirement_text


CATEGORY_KEYWORDS = {
    "Functional": [
        "create",
        "update",
        "delete",
        "submit",
        "generate",
        "send",
        "display",
        "allow",
        "login",
        "register",
    ],
    "Non-Functional": [
        "maintainable",
        "available",
        "scalable",
        "portable",
        "compatible",
        "robust",
        "stable",
    ],
    "Security": [
        "secure",
        "encrypt",
        "authentication",
        "authorization",
        "permission",
        "token",
        "password",
        "attack",
        "privacy",
    ],
    "Performance": [
        "fast",
        "quick",
        "latency",
        "response",
        "throughput",
        "optimize",
        "performance",
        "load",
        "speed",
    ],
    "Usability": [
        "user-friendly",
        "easy",
        "intuitive",
        "accessible",
        "simple",
        "clear",
        "understandable",
        "dashboard",
        "navigation",
    ],
}


def classify_requirement(text: str) -> dict[str, str]:
    """
    Purpose:
        Predict the category of a requirement using simple keyword scoring.
    Inputs:
        text: The raw or already-cleaned requirement text.
    Outputs:
        A dictionary containing the cleaned text, predicted category, and reasoning.
    Flow:
        Clean the text, count category keyword matches, pick the strongest match,
        and fall back to Functional when no keywords are found.
    """

    cleaned_text = clean_requirement_text(text)
    score_by_category: dict[str, int] = {}

    for category, keywords in CATEGORY_KEYWORDS.items():
        score_by_category[category] = sum(
            1 for keyword in keywords if keyword in cleaned_text
        )

    predicted_category = max(score_by_category, key=score_by_category.get)
    highest_score = score_by_category[predicted_category]

    if highest_score == 0:
        predicted_category = "Functional"
        reasoning = (
            "No strong category keywords were detected, so the requirement "
            "was treated as a functional behavior by default."
        )
    else:
        reasoning = (
            f"The classifier matched {highest_score} keyword(s) related to "
            f"{predicted_category.lower()} requirements."
        )

    return {
        "cleaned_text": cleaned_text,
        "predicted_category": predicted_category,
        "reasoning": reasoning,
    }

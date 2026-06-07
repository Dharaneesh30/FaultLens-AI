from app.services.preprocess import clean_requirement_text


OPPOSING_KEYWORD_GROUPS = [
    ("must", "must not"),
    ("allow", "prevent"),
    ("enable", "disable"),
    ("public", "private"),
    ("manual", "automatic"),
    ("always", "never"),
    ("required", "optional"),
]

TOPIC_KEYWORDS = {
    "login",
    "register",
    "password",
    "user",
    "admin",
    "payment",
    "report",
    "email",
    "data",
    "access",
    "notification",
    "dashboard",
}


def detect_conflict(requirement_a: str, requirement_b: str) -> dict[str, str | bool]:
    """
    Purpose:
        Compare two requirements and determine whether they appear to conflict.
    Inputs:
        requirement_a: The first raw requirement text.
        requirement_b: The second raw requirement text.
    Outputs:
        A dictionary with cleaned text, conflict status, and reasoning.
    Flow:
        Clean both texts, look for a shared topic, check for opposing intent,
        and return a clear explanation for the user.
    """

    cleaned_a = clean_requirement_text(requirement_a)
    cleaned_b = clean_requirement_text(requirement_b)

    topic_matches = [
        topic for topic in TOPIC_KEYWORDS if topic in cleaned_a and topic in cleaned_b
    ]

    for positive_keyword, negative_keyword in OPPOSING_KEYWORD_GROUPS:
        keywords_in_a = positive_keyword in cleaned_a and negative_keyword in cleaned_b
        keywords_in_b = positive_keyword in cleaned_b and negative_keyword in cleaned_a

        if keywords_in_a or keywords_in_b:
            if topic_matches:
                reasoning = (
                    "Both requirements discuss "
                    f"{', '.join(topic_matches)} but use opposing intent such as "
                    f"'{positive_keyword}' and '{negative_keyword}'."
                )
                return {
                    "cleaned_requirement_a": cleaned_a,
                    "cleaned_requirement_b": cleaned_b,
                    "conflict_detected": True,
                    "reasoning": reasoning,
                }

    if topic_matches:
        reasoning = (
            "The requirements appear related because they mention "
            f"{', '.join(topic_matches)}, but no strong contradiction keywords were found."
        )
    else:
        reasoning = (
            "The requirements do not appear to describe the same topic, so no conflict "
            "was detected."
        )

    return {
        "cleaned_requirement_a": cleaned_a,
        "cleaned_requirement_b": cleaned_b,
        "conflict_detected": False,
        "reasoning": reasoning,
    }

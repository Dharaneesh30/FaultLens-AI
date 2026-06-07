import re


def clean_requirement_text(text: str) -> str:
    """
    Purpose:
        Normalize raw requirement text before it is classified.
    Inputs:
        text: The original requirement entered by the user.
    Outputs:
        A cleaned and normalized requirement string.
    Flow:
        Strip whitespace, convert to lowercase, remove noisy punctuation,
        and collapse repeated spaces.
    """

    lowered_text = text.strip().lower()
    normalized_text = re.sub(r"[^a-z0-9\s-]", " ", lowered_text)
    collapsed_text = re.sub(r"\s+", " ", normalized_text)
    return collapsed_text.strip()

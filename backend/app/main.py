from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from app.services.classifier import classify_requirement
from app.services.conflict_detector import detect_conflict


app = FastAPI(
    title="FaultLens AI API",
    description="Phase 1 backend foundation for the FaultLens AI project.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ClassificationRequest(BaseModel):
    """
    Purpose:
        Validate the requirement text sent from the frontend.
    Inputs:
        requirement_text: The raw requirement string entered by the user.
    Outputs:
        A validated request object for the API route.
    Flow:
        Ensure the text exists and has a reasonable minimum length.
    """

    requirement_text: str = Field(..., min_length=3)


class ClassificationResponse(BaseModel):
    """
    Purpose:
        Standardize the classification data returned to the frontend.
    Inputs:
        original_text: The user-entered requirement.
        cleaned_text: The normalized requirement text.
        predicted_category: The category selected by the classifier.
        reasoning: A short explanation for the prediction.
    Outputs:
        A structured API response model.
    Flow:
        Package the backend classification result in a predictable schema.
    """

    original_text: str
    cleaned_text: str
    predicted_category: str
    reasoning: str


class ConflictDetectionRequest(BaseModel):
    """
    Purpose:
        Validate the two requirement strings sent for conflict detection.
    Inputs:
        requirement_a: The first requirement entered by the user.
        requirement_b: The second requirement entered by the user.
    Outputs:
        A validated request object for the conflict endpoint.
    Flow:
        Ensure both fields exist and contain meaningful text.
    """

    requirement_a: str = Field(..., min_length=3)
    requirement_b: str = Field(..., min_length=3)


class ConflictDetectionResponse(BaseModel):
    """
    Purpose:
        Standardize the conflict detection data returned to the frontend.
    Inputs:
        original_requirement_a: The first user-entered requirement.
        original_requirement_b: The second user-entered requirement.
        cleaned_requirement_a: The cleaned form of the first requirement.
        cleaned_requirement_b: The cleaned form of the second requirement.
        conflict_detected: Whether the service found a contradiction.
        reasoning: A short explanation of the decision.
    Outputs:
        A structured API response model for the frontend.
    Flow:
        Package the conflict detection result in a predictable schema.
    """

    original_requirement_a: str
    original_requirement_b: str
    cleaned_requirement_a: str
    cleaned_requirement_b: str
    conflict_detected: bool
    reasoning: str


@app.get("/")
def read_root() -> dict[str, str]:
    """
    Purpose:
        Provide a simple root response so the backend can be checked quickly.
    Inputs:
        None.
    Outputs:
        A welcome message dictionary.
    Flow:
        Return a static API message.
    """

    return {"message": "Welcome to the FaultLens AI backend."}


@app.get("/health")
def read_health() -> dict[str, str]:
    """
    Purpose:
        Report whether the backend service is available to the frontend.
    Inputs:
        None.
    Outputs:
        A simple health status payload.
    Flow:
        Return a fixed healthy status and short message.
    """

    return {"status": "ok", "message": "FastAPI backend is running."}


@app.post("/classify", response_model=ClassificationResponse)
def classify_requirement_endpoint(
    payload: ClassificationRequest,
) -> ClassificationResponse:
    """
    Purpose:
        Classify a requirement and return both cleaned text and category prediction.
    Inputs:
        payload: A request model containing requirement_text.
    Outputs:
        A structured classification response.
    Flow:
        Read the original text, pass it through the classifier service,
        and return the combined result for frontend display.
    """

    classification_result = classify_requirement(payload.requirement_text)
    return ClassificationResponse(
        original_text=payload.requirement_text,
        cleaned_text=classification_result["cleaned_text"],
        predicted_category=classification_result["predicted_category"],
        reasoning=classification_result["reasoning"],
    )


@app.post("/conflicts", response_model=ConflictDetectionResponse)
def detect_conflict_endpoint(
    payload: ConflictDetectionRequest,
) -> ConflictDetectionResponse:
    """
    Purpose:
        Compare two requirements and report whether they conflict.
    Inputs:
        payload: A request model containing requirement_a and requirement_b.
    Outputs:
        A structured conflict detection response.
    Flow:
        Read both requirements, call the conflict detector service,
        and return the formatted result for frontend display.
    """

    conflict_result = detect_conflict(payload.requirement_a, payload.requirement_b)
    return ConflictDetectionResponse(
        original_requirement_a=payload.requirement_a,
        original_requirement_b=payload.requirement_b,
        cleaned_requirement_a=conflict_result["cleaned_requirement_a"],
        cleaned_requirement_b=conflict_result["cleaned_requirement_b"],
        conflict_detected=conflict_result["conflict_detected"],
        reasoning=conflict_result["reasoning"],
    )

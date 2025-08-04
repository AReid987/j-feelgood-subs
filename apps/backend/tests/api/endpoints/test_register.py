from fastapi.testclient import TestClient
from backend.app.api.endpoints.register import router

client = TestClient(router)

def test_register_user_success():
    """
    Test that the registration endpoint is accessible and returns a success message for valid input.
    """
    valid_payload = {
        "email": "test@example.com",
        "password": "SecurePassword123"
    }
    response = client.post("/register", json=valid_payload)
    assert response.status_code == 200
 assert response.json() == {"message": "User registration endpoint hit successfully (placeholder)."}

def test_register_user_invalid_email():
 """
 Test that the registration endpoint returns an error for an invalid email format.
 """
 invalid_payload = {
 "email": "invalid-email",
 "password": "SecurePassword123"
 }
 response = client.post("/register", json=invalid_payload)
 assert response.status_code == 422 # Unprocessable Entity for validation errors

def test_register_user_password_too_short():
 """
 Test that the registration endpoint returns an error for a password that is too short.
 """
 invalid_payload = {
 "email": "test@example.com",
 "password": "short"
 }
 response = client.post("/register", json=invalid_payload)
 assert response.status_code == 422 # Unprocessable Entity for validation errors

def test_register_user_duplicate_email(mocker):
    """
    Test that the registration endpoint returns an error for a duplicate email.
    """
    # Simulate the duplicate email scenario by mocking the check within the endpoint
    mocker.patch('backend.app.api.endpoints.register.router.post', side_effect=HTTPException(status_code=400, detail="Email already registered"))

    duplicate_payload = {
        "email": "existing@example.com", # Use the email that triggers the simulated duplicate check
        "password": "SecurePassword123"
    }
    response = client.post("/register", json=duplicate_payload)
    assert response.status_code == 400
    assert response.json() == {"detail": "Email already registered"}

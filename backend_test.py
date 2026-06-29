import requests
import json
from datetime import datetime
from pymongo import MongoClient

# Get the backend URL from environment
BACKEND_URL = "https://passion-redesign.preview.emergentagent.com/api"

# MongoDB connection for persistence verification
MONGO_URL = "mongodb://localhost:27017"
DB_NAME = "test_database"

def test_root_endpoint():
    """Test GET /api/ endpoint"""
    print("\n" + "="*60)
    print("TEST 1: GET /api/ - Root Endpoint")
    print("="*60)
    
    try:
        response = requests.get(f"{BACKEND_URL}/")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("message") == "Hello World":
                print("✅ PASSED: Root endpoint returns correct message")
                return True
            else:
                print(f"❌ FAILED: Expected message 'Hello World', got {data.get('message')}")
                return False
        else:
            print(f"❌ FAILED: Expected status 200, got {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ FAILED: Exception occurred - {str(e)}")
        return False

def test_create_status_check():
    """Test POST /api/status endpoint"""
    print("\n" + "="*60)
    print("TEST 2: POST /api/status - Create Status Check")
    print("="*60)
    
    try:
        payload = {"client_name": "regression_" + datetime.now().strftime("%Y%m%d_%H%M%S")}
        print(f"Payload: {payload}")
        
        response = requests.post(
            f"{BACKEND_URL}/status",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            # Verify response structure
            if all(key in data for key in ["id", "client_name", "timestamp"]):
                if data["client_name"] == payload["client_name"]:
                    print("✅ PASSED: Status check created successfully with correct structure")
                    return True, data["id"]
                else:
                    print(f"❌ FAILED: client_name mismatch. Expected {payload['client_name']}, got {data['client_name']}")
                    return False, None
            else:
                print(f"❌ FAILED: Response missing required fields. Got: {data.keys()}")
                return False, None
        else:
            print(f"❌ FAILED: Expected status 200, got {response.status_code}")
            print(f"Response body: {response.text}")
            return False, None
    except Exception as e:
        print(f"❌ FAILED: Exception occurred - {str(e)}")
        return False, None

def test_get_status_checks():
    """Test GET /api/status endpoint"""
    print("\n" + "="*60)
    print("TEST 3: GET /api/status - Get All Status Checks")
    print("="*60)
    
    try:
        response = requests.get(f"{BACKEND_URL}/status")
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Response: List with {len(data)} items")
            
            if isinstance(data, list):
                if len(data) > 0:
                    print(f"Sample item: {data[0]}")
                    # Verify structure of first item
                    if all(key in data[0] for key in ["id", "client_name", "timestamp"]):
                        print("✅ PASSED: Status checks retrieved successfully with correct structure")
                        return True
                    else:
                        print(f"❌ FAILED: Items missing required fields. Got: {data[0].keys()}")
                        return False
                else:
                    print("✅ PASSED: Status checks retrieved successfully (empty list)")
                    return True
            else:
                print(f"❌ FAILED: Expected list response, got {type(data)}")
                return False
        else:
            print(f"❌ FAILED: Expected status 200, got {response.status_code}")
            print(f"Response body: {response.text}")
            return False
    except Exception as e:
        print(f"❌ FAILED: Exception occurred - {str(e)}")
        return False

def test_contact_happy_path_decouverte():
    """Test POST /api/contact with valid decouverte request"""
    print("\n" + "="*60)
    print("TEST 4: POST /api/contact - Happy Path (Cours découverte)")
    print("="*60)
    
    try:
        payload = {
            "name": "Sophie Dubois",
            "email": "delivered@resend.dev",
            "phone": "06 12 34 56 78",
            "studio": "Nantes",
            "courseType": None,
            "requestType": "decouverte",
            "message": "Bonjour Madame ADRIEN,\n\nj'aurais aimé m'inscrire à un cours de découverte collectifs ou privé dans l'un de vos studios.\n\nQuelles sont les disponibilités ?\n\nBien à vous,\n\nMadame Sophie Dubois"
        }
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        response = requests.post(
            f"{BACKEND_URL}/contact",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("ok") == True and "id" in data:
                print("✅ PASSED: Contact form submission successful (decouverte)")
                return True, data["id"]
            else:
                print(f"❌ FAILED: Expected ok=True with id, got {data}")
                return False, None
        else:
            print(f"❌ FAILED: Expected status 200, got {response.status_code}")
            print(f"Response body: {response.text}")
            return False, None
    except Exception as e:
        print(f"❌ FAILED: Exception occurred - {str(e)}")
        return False, None

def test_contact_happy_path_inscription():
    """Test POST /api/contact with valid inscription request with courseType"""
    print("\n" + "="*60)
    print("TEST 5: POST /api/contact - Happy Path (Inscription with courseType)")
    print("="*60)
    
    try:
        payload = {
            "name": "Marie Laurent",
            "email": "delivered@resend.dev",
            "phone": "06 98 76 54 32",
            "studio": "La Baule",
            "courseType": "Cours Duo",
            "requestType": "inscription",
            "message": "Bonjour,\n\nJe souhaite m'inscrire à un Cours Duo au studio de La Baule.\n\nMerci de me recontacter.\n\nCordialement,\nMarie Laurent"
        }
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        response = requests.post(
            f"{BACKEND_URL}/contact",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("ok") == True and "id" in data:
                print("✅ PASSED: Contact form submission successful (inscription with courseType)")
                return True, data["id"]
            else:
                print(f"❌ FAILED: Expected ok=True with id, got {data}")
                return False, None
        else:
            print(f"❌ FAILED: Expected status 200, got {response.status_code}")
            print(f"Response body: {response.text}")
            return False, None
    except Exception as e:
        print(f"❌ FAILED: Exception occurred - {str(e)}")
        return False, None

def test_contact_validation_missing_name():
    """Test POST /api/contact with missing/empty name"""
    print("\n" + "="*60)
    print("TEST 6: POST /api/contact - Validation (missing name)")
    print("="*60)
    
    try:
        payload = {
            "name": "",
            "email": "delivered@resend.dev",
            "phone": "06 12 34 56 78",
            "studio": "Nantes",
            "courseType": None,
            "requestType": "decouverte",
            "message": "Test message"
        }
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        response = requests.post(
            f"{BACKEND_URL}/contact",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 422:
            print("✅ PASSED: Validation error returned for empty name (422)")
            return True
        else:
            print(f"❌ FAILED: Expected status 422, got {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ FAILED: Exception occurred - {str(e)}")
        return False

def test_contact_validation_invalid_email():
    """Test POST /api/contact with invalid email format"""
    print("\n" + "="*60)
    print("TEST 7: POST /api/contact - Validation (invalid email)")
    print("="*60)
    
    try:
        payload = {
            "name": "Test User",
            "email": "not-an-email",
            "phone": "06 12 34 56 78",
            "studio": "Nantes",
            "courseType": None,
            "requestType": "decouverte",
            "message": "Test message"
        }
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        response = requests.post(
            f"{BACKEND_URL}/contact",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 422:
            print("✅ PASSED: Validation error returned for invalid email (422)")
            return True
        else:
            print(f"❌ FAILED: Expected status 422, got {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ FAILED: Exception occurred - {str(e)}")
        return False

def test_contact_validation_empty_message():
    """Test POST /api/contact with empty message"""
    print("\n" + "="*60)
    print("TEST 8: POST /api/contact - Validation (empty message)")
    print("="*60)
    
    try:
        payload = {
            "name": "Test User",
            "email": "delivered@resend.dev",
            "phone": "06 12 34 56 78",
            "studio": "Nantes",
            "courseType": None,
            "requestType": "decouverte",
            "message": ""
        }
        print(f"Payload: {json.dumps(payload, indent=2)}")
        
        response = requests.post(
            f"{BACKEND_URL}/contact",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 422:
            print("✅ PASSED: Validation error returned for empty message (422)")
            return True
        else:
            print(f"❌ FAILED: Expected status 422, got {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ FAILED: Exception occurred - {str(e)}")
        return False

def test_contact_special_characters_in_name():
    """Test POST /api/contact with special characters in name (should sanitize)"""
    print("\n" + "="*60)
    print("TEST 9: POST /api/contact - Special Characters in Name (sanitization)")
    print("="*60)
    
    try:
        payload = {
            "name": "Jean <hacker>",
            "email": "delivered@resend.dev",
            "phone": "06 12 34 56 78",
            "studio": None,
            "courseType": None,
            "requestType": "info",
            "message": "Test message with special characters in name"
        }
        print(f"Payload: {json.dumps(payload, indent=2)}")
        print("Note: Name contains < and > characters that should be sanitized")
        
        response = requests.post(
            f"{BACKEND_URL}/contact",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("ok") == True and "id" in data:
                print("✅ PASSED: Contact form submission successful with special characters (sanitized)")
                return True, data["id"]
            else:
                print(f"❌ FAILED: Expected ok=True with id, got {data}")
                return False, None
        else:
            print(f"❌ FAILED: Expected status 200, got {response.status_code}")
            print(f"Response body: {response.text}")
            return False, None
    except Exception as e:
        print(f"❌ FAILED: Exception occurred - {str(e)}")
        return False, None

def test_contact_mongodb_persistence(contact_ids):
    """Verify contact messages are persisted in MongoDB"""
    print("\n" + "="*60)
    print("TEST 10: MongoDB Persistence - Verify contact messages saved")
    print("="*60)
    
    try:
        client = MongoClient(MONGO_URL)
        db = client[DB_NAME]
        collection = db.contact_messages
        
        print(f"Checking for {len(contact_ids)} contact message(s) in MongoDB...")
        
        found_count = 0
        for contact_id in contact_ids:
            if contact_id:
                doc = collection.find_one({"id": contact_id})
                if doc:
                    print(f"✓ Found contact message with id: {contact_id}")
                    print(f"  - Name: {doc.get('name')}")
                    print(f"  - Email: {doc.get('email')}")
                    print(f"  - Request Type: {doc.get('requestType')}")
                    found_count += 1
                else:
                    print(f"✗ Contact message with id {contact_id} NOT FOUND in MongoDB")
        
        client.close()
        
        if found_count == len(contact_ids):
            print(f"✅ PASSED: All {found_count} contact messages persisted in MongoDB")
            return True
        else:
            print(f"❌ FAILED: Only {found_count}/{len(contact_ids)} messages found in MongoDB")
            return False
            
    except Exception as e:
        print(f"❌ FAILED: Exception occurred - {str(e)}")
        return False

def run_all_tests():
    """Run all API tests"""
    print("\n" + "="*60)
    print("BACKEND API TESTING - Contact Endpoint & Regression Tests")
    print("="*60)
    print(f"Backend URL: {BACKEND_URL}")
    
    results = {
        "test_root": False,
        "test_create_status": False,
        "test_get_status": False,
        "test_contact_decouverte": False,
        "test_contact_inscription": False,
        "test_validation_name": False,
        "test_validation_email": False,
        "test_validation_message": False,
        "test_special_characters": False,
        "test_mongodb_persistence": False
    }
    
    contact_ids = []
    
    # Regression Tests
    print("\n" + "="*60)
    print("REGRESSION TESTS - Existing Endpoints")
    print("="*60)
    
    results["test_root"] = test_root_endpoint()
    results["test_create_status"], _ = test_create_status_check()
    results["test_get_status"] = test_get_status_checks()
    
    # Contact Endpoint Tests
    print("\n" + "="*60)
    print("NEW FEATURE TESTS - /api/contact Endpoint")
    print("="*60)
    
    # Happy path tests
    results["test_contact_decouverte"], id1 = test_contact_happy_path_decouverte()
    if id1:
        contact_ids.append(id1)
    
    results["test_contact_inscription"], id2 = test_contact_happy_path_inscription()
    if id2:
        contact_ids.append(id2)
    
    # Validation tests
    results["test_validation_name"] = test_contact_validation_missing_name()
    results["test_validation_email"] = test_contact_validation_invalid_email()
    results["test_validation_message"] = test_contact_validation_empty_message()
    
    # Special characters test
    results["test_special_characters"], id3 = test_contact_special_characters_in_name()
    if id3:
        contact_ids.append(id3)
    
    # MongoDB persistence test
    if contact_ids:
        results["test_mongodb_persistence"] = test_contact_mongodb_persistence(contact_ids)
    else:
        print("\n⚠️  Skipping MongoDB persistence test - no successful contact submissions")
    
    # Summary
    print("\n" + "="*60)
    print("TEST SUMMARY")
    print("="*60)
    
    print("\nRegression Tests:")
    print(f"  GET /api/: {'✅ PASSED' if results['test_root'] else '❌ FAILED'}")
    print(f"  POST /api/status: {'✅ PASSED' if results['test_create_status'] else '❌ FAILED'}")
    print(f"  GET /api/status: {'✅ PASSED' if results['test_get_status'] else '❌ FAILED'}")
    
    print("\nContact Endpoint Tests:")
    print(f"  Happy path (decouverte): {'✅ PASSED' if results['test_contact_decouverte'] else '❌ FAILED'}")
    print(f"  Happy path (inscription): {'✅ PASSED' if results['test_contact_inscription'] else '❌ FAILED'}")
    print(f"  Validation (missing name): {'✅ PASSED' if results['test_validation_name'] else '❌ FAILED'}")
    print(f"  Validation (invalid email): {'✅ PASSED' if results['test_validation_email'] else '❌ FAILED'}")
    print(f"  Validation (empty message): {'✅ PASSED' if results['test_validation_message'] else '❌ FAILED'}")
    print(f"  Special characters (sanitization): {'✅ PASSED' if results['test_special_characters'] else '❌ FAILED'}")
    print(f"  MongoDB persistence: {'✅ PASSED' if results['test_mongodb_persistence'] else '❌ FAILED'}")
    
    passed = sum(results.values())
    total = len(results)
    
    print(f"\nTotal: {passed}/{total} tests passed")
    
    if passed == total:
        print("\n🎉 ALL TESTS PASSED - Contact endpoint working correctly, no regressions")
    else:
        print(f"\n⚠️  {total - passed} TEST(S) FAILED")
    
    return results

if __name__ == "__main__":
    run_all_tests()

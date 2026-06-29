import requests
import json
from datetime import datetime

# Get the backend URL from environment
BACKEND_URL = "https://passion-redesign.preview.emergentagent.com/api"

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
        payload = {"client_name": "test_client_" + datetime.now().strftime("%Y%m%d_%H%M%S")}
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

def run_all_tests():
    """Run all API tests"""
    print("\n" + "="*60)
    print("BACKEND API TESTING - Type Hints Verification")
    print("="*60)
    print(f"Backend URL: {BACKEND_URL}")
    
    results = {
        "test_root": False,
        "test_create": False,
        "test_get": False
    }
    
    # Test 1: Root endpoint
    results["test_root"] = test_root_endpoint()
    
    # Test 2: Create status check
    results["test_create"], created_id = test_create_status_check()
    
    # Test 3: Get status checks
    results["test_get"] = test_get_status_checks()
    
    # Summary
    print("\n" + "="*60)
    print("TEST SUMMARY")
    print("="*60)
    passed = sum(results.values())
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASSED" if result else "❌ FAILED"
        print(f"{test_name}: {status}")
    
    print(f"\nTotal: {passed}/{total} tests passed")
    
    if passed == total:
        print("\n🎉 ALL TESTS PASSED - No regressions from type hint additions")
    else:
        print(f"\n⚠️  {total - passed} TEST(S) FAILED - Type hints may have introduced issues")
    
    return results

if __name__ == "__main__":
    run_all_tests()

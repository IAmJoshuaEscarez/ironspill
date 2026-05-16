#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include "soc/soc.h"
#include "soc/rtc_cntl_reg.h"

// ===================== PIN CONFIGURATION =====================
// Pumps
const int MAIN_PUMP  = 32; 
const int WATER_PUMP = 33; 
const int OIL_PUMP   = 25; 

// Valves (Motorized)
const int V1_OPEN    = 26; 
const int V1_CLOSE   = 27; 
const int V2_OPEN    = 4;  
const int V2_CLOSE   = 5;

// Sensors
const int SENSOR_HIGH = 18; 
const int SENSOR_LOW  = 19; 

AsyncWebServer server(80);
bool systemReady = false; 
bool isDraining = false;


void forceAllOFF() {
  digitalWrite(MAIN_PUMP, HIGH);
  digitalWrite(WATER_PUMP, HIGH);
  digitalWrite(OIL_PUMP, HIGH);
  digitalWrite(V1_OPEN, HIGH);
  digitalWrite(V1_CLOSE, HIGH);
  digitalWrite(V2_OPEN, HIGH);
  digitalWrite(V2_CLOSE, HIGH);
}

void setup() {
  WRITE_PERI_REG(RTC_CNTL_BROWN_OUT_REG, 0); 
  Serial.begin(115200);


  forceAllOFF();

  pinMode(MAIN_PUMP, OUTPUT);
  pinMode(WATER_PUMP, OUTPUT);
  pinMode(OIL_PUMP, OUTPUT);
  pinMode(V1_OPEN, OUTPUT);
  pinMode(V1_CLOSE, OUTPUT);
  pinMode(V2_OPEN, OUTPUT);
  pinMode(V2_CLOSE, OUTPUT);

  pinMode(SENSOR_HIGH, INPUT_PULLUP);
  pinMode(SENSOR_LOW, INPUT_PULLUP);

 
  delay(3000); 
  forceAllOFF(); 
  systemReady = true;


  WiFi.softAP("IronSpill", "123456789");
  Serial.println("System Ready: 192.168.4.1");


  server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    String h = "<html><head><meta name='viewport' content='width=device-width, initial-scale=1.0'>";
    h += "<style>button{padding:15px; width:130px; margin:5px; border-radius:10px; font-weight:bold; cursor:pointer;}</style></head>";
    h += "<body style='text-align:center; font-family:Arial;'>";
    h += "<h2>TapatChain Separator Control</h2><hr>";
    

    h += "<div><p><b>MAIN PUMP</b><br>";
    h += "<a href='/main_on'><button style='background:green;color:white;'>START</button></a>";
    h += "<a href='/main_off'><button style='background:red;color:white;'>STOP</button></a></p></div>";


    h += "<div><p><b>WATER PUMP</b><br>";
    h += "<a href='/water_on'><button style='background:green;color:white;'>START</button></a>";
    h += "<a href='/water_off'><button style='background:red;color:white;'>STOP</button></a></p></div>";

 
    h += "<div><p><b>OIL PUMP</b><br>";
    h += "<a href='/oil_on'><button style='background:green;color:white;'>START</button></a>";
    h += "<a href='/oil_off'><button style='background:red;color:white;'>STOP</button></a></p></div>";
    
    h += "<hr><p style='color:blue;'>Valves: Automatic Sensor Mode</p>";
    h += "</body></html>";
    request->send(200, "text/html", h);
  });


  server.on("/main_on",  HTTP_GET, [](AsyncWebServerRequest *request){ digitalWrite(MAIN_PUMP, LOW); request->redirect("/"); });
  server.on("/main_off", HTTP_GET, [](AsyncWebServerRequest *request){ digitalWrite(MAIN_PUMP, HIGH); request->redirect("/"); });
  
  server.on("/water_on", HTTP_GET, [](AsyncWebServerRequest *request){ digitalWrite(WATER_PUMP, LOW); request->redirect("/"); });
  server.on("/water_off",HTTP_GET, [](AsyncWebServerRequest *request){ digitalWrite(WATER_PUMP, HIGH); request->redirect("/"); });
  
  server.on("/oil_on",   HTTP_GET, [](AsyncWebServerRequest *request){ digitalWrite(OIL_PUMP, LOW); request->redirect("/"); });
  server.on("/oil_off",  HTTP_GET, [](AsyncWebServerRequest *request){ digitalWrite(OIL_PUMP, HIGH); request->redirect("/"); });

  server.begin();
}

void loop() {
  if (!systemReady) return; 

  bool highDet = (digitalRead(SENSOR_HIGH) == LOW); 
  bool lowDet = (digitalRead(SENSOR_LOW) == LOW);


  if (highDet && !isDraining) {
    digitalWrite(V1_OPEN, LOW);   // Relay ON
    digitalWrite(V1_CLOSE, HIGH);  // Relay OFF
    isDraining = true;
    Serial.println("TANK FULL: Opening Water Valve...");
  } 
  

  if (!lowDet && isDraining) {
    digitalWrite(V1_OPEN, HIGH);  // Relay OFF
    digitalWrite(V1_CLOSE, LOW);   // Relay ON
    isDraining = false;
    Serial.println("TANK EMPTY: Closing Water Valve...");
  }
}

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

public class GUITesting
{
	@Test public void t0() 
	{
		System.setProperty("webdriver.gecko.driver","C:\\Users\\tanay\\Downloads\\geckodriver-v0.24.0-win64\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		wd.get("http://soccerbase.appspot.com/");

		
		WebElement we = wd.findElement(By.linkText("Countries"));
		assertNotNull(we);
		wd.quit(); // close the browser window
	}
	
	@Test public void t1() 
	{
		System.setProperty("webdriver.gecko.driver","C:\\Users\\tanay\\Downloads\\geckodriver-v0.24.0-win64\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		
		wd.get("http://soccerbase.appspot.com/");

		WebElement we = wd.findElement(By.linkText("Leagues"));
		assertNotNull(we);
		wd.quit();
	}
	
	@Test public void t2() 
	{
		System.setProperty("webdriver.gecko.driver","C:\\Users\\tanay\\Downloads\\geckodriver-v0.24.0-win64\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		
		wd.get("http://soccerbase.appspot.com/");

		WebElement we = wd.findElement(By.linkText("Teams"));
		assertNotNull(we);
		wd.quit();
	}
	
	
	@Test public void t3() 
	{
		System.setProperty("webdriver.gecko.driver","C:\\Users\\tanay\\Downloads\\geckodriver-v0.24.0-win64\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		
		wd.get("http://soccerbase.appspot.com/");

		WebElement we = wd.findElement(By.linkText("Countries"));
		we.click();
		
		we = wd.findElement(By.linkText("Terms Of Use"));
		assertNotNull(we);
		wd.quit();
	}
	
	@Test public void t4() 
	{
		System.setProperty("webdriver.gecko.driver","C:\\Users\\tanay\\Downloads\\geckodriver-v0.24.0-win64\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		
		wd.get("http://soccerbase.appspot.com/");

		WebElement we = wd.findElement(By.linkText("Leagues"));
		we.click();
		
		we = wd.findElement(By.linkText("About Us"));
		assertNotNull(we);
		wd.quit();
	}
	
	@Test public void t5() 
	{
		System.setProperty("webdriver.gecko.driver","C:\\Users\\tanay\\Downloads\\geckodriver-v0.24.0-win64\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		
		wd.get("http://soccerbase.appspot.com/");

		WebElement we = wd.findElement(By.linkText("Teams"));
		we.click();
		
		we = wd.findElement(By.linkText("Countries"));
		assertNotNull(we);
		wd.quit();
	}
	
	@Test public void t6() 
	{
		System.setProperty("webdriver.gecko.driver","C:\\Users\\tanay\\Downloads\\geckodriver-v0.24.0-win64\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		
		wd.get("http://soccerbase.appspot.com/");

		WebElement we = wd.findElement(By.linkText("Leagues"));
		we.click();
		
		we = wd.findElement(By.linkText("Terms Of Use"));
		assertNotNull(we);
		wd.quit();
	}
	
	@Test public void t7() 
	{
		System.setProperty("webdriver.gecko.driver","C:\\Users\\tanay\\Downloads\\geckodriver-v0.24.0-win64\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		
		wd.get("http://soccerbase.appspot.com/");

		WebElement we = wd.findElement(By.linkText("Terms of Use"));
		we.click();
		
		we = wd.findElement(By.linkText("Teams"));
		assertNotNull(we);
		wd.quit();
	}
	
	
	@Test public void t8() 
	{
		System.setProperty("webdriver.gecko.driver","C:\\Users\\tanay\\Downloads\\geckodriver-v0.24.0-win64\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		
		wd.get("http://soccerbase.appspot.com/Countries/Algeria#");

		WebElement we = wd.findElement(By.linkText("Home"));
		assertNotNull(we);
		wd.quit();
	}
	
	
	@Test public void t9() 
	{
		System.setProperty("webdriver.gecko.driver","C:\\Users\\tanay\\Downloads\\geckodriver-v0.24.0-win64\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		
		wd.get("http://www.soccerbase.appspot.com/Leagues/904_Ligue%202");

		WebElement we = wd.findElement(By.linkText("Countries"));
		assertNotNull(we);
		wd.quit();
	}
	
	@Test public void t10() 
	{
		System.setProperty("webdriver.gecko.driver","C:\\Users\\tanay\\Downloads\\geckodriver-v0.24.0-win64\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		
		wd.get("http://www.soccerbase.appspot.com/Teams/10410_Tokyo%20Musashino%20City");

		WebElement we = wd.findElement(By.linkText("Leagues"));
		assertNotNull(we);
		wd.quit();
	}
	
	@Test public void t11() 
	{
		System.setProperty("webdriver.gecko.driver","C:\\Users\\tanay\\Downloads\\geckodriver-v0.24.0-win64\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		
		wd.get("http://www.soccerbase.appspot.com/TermsOfUse");

		WebElement we = wd.findElement(By.linkText("Home"));
		assertNotNull(we);
		wd.quit();
	}
	
	@Test public void t12() 
	{
		System.setProperty("webdriver.gecko.driver","C:\\Users\\tanay\\Downloads\\geckodriver-v0.24.0-win64\\geckodriver.exe");
		WebDriver wd = new FirefoxDriver(); // launch the browser
		
		wd.get("http://www.soccerbase.appspot.com/aboutUs");

		WebElement we = wd.findElement(By.linkText("Teams"));
		assertNotNull(we);
		wd.quit();
	}
	
}

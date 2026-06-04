using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddRazorPages();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

/*
  Render chạy qua HTTPS sẵn rồi.
  Nếu bật UseHttpsRedirection đôi khi Render bị lỗi redirect.
  Nếu chạy local muốn HTTPS thì có thể bật lại dòng này.
*/
// app.UseHttpsRedirection();

/*
  Cho phép mở file mặc định trong wwwroot:
  - wwwroot/index.html
  - wwwroot/default.html
*/
app.UseDefaultFiles();

app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

/*
  Nếu truy cập / thì tự chuyển về index.html
*/
app.MapGet("/", () => Results.Redirect("/index.html"));

/*
  Nếu project của bạn để trang chủ trong wwwroot/pages/index.html
  thì đổi dòng trên thành:
  app.MapGet("/", () => Results.Redirect("/pages/index.html"));
*/

app.Run();
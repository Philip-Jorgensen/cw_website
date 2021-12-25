from flask import Blueprint, render_template, redirect, url_for
import os
import math

views = Blueprint("views", __name__)

@views.route("/")
@views.route("/home")
def home():
    return render_template("home.html", active='home')

@views.route("/desktop-wallpapers")
def dw_page():
    dw_imgs_lowres = []
    dw_imgs_fullres = []
    dw_titles = []
    path = 'static/assets/dw'
    path_lowres = path + '_lowres'
    for filename in os.listdir(f"website/{path}"):
        dw_titles.append(filename[3:-4])
        if filename.endswith(".jpg"):
            dw_imgs_lowres.append(os.path.join(path_lowres, filename))
            dw_imgs_fullres.append(os.path.join(path, filename))
        elif filename.endswith(".png"):
            dw_imgs_lowres.append(os.path.join(path_lowres, f"{filename[:-4]}.jpg"))
            dw_imgs_fullres.append(os.path.join(path, filename))
        else:
            continue
    img_count = len(dw_imgs_lowres)
    col_count = 2
    return render_template(
        "dw.html", 
        dw_imgs_lowres = dw_imgs_lowres, 
        row_count = math.ceil(img_count/col_count), 
        active='dw', 
        col_count = col_count, 
        dw_imgs_fullres = dw_imgs_fullres,
        dw_titles = dw_titles)

@views.route("/phone-wallpapers")
def pw_page():
    pw_imgs_lowres = []
    pw_imgs_fullres = []
    pw_titles = []
    col_count = 3
    path = 'static/assets/pw'
    path_lowres = path + '_lowres'
    for filename in os.listdir(f"website/{path}"):
        pw_titles.append(filename[3:-4])
        if filename.endswith(".jpg"):
            pw_imgs_lowres.append(os.path.join(path_lowres, filename))
            pw_imgs_fullres.append(os.path.join(path, filename))
        elif filename.endswith(".png"):
            pw_imgs_lowres.append(os.path.join(path_lowres, f"{filename[:-4]}.jpg"))
            pw_imgs_fullres.append(os.path.join(path, filename))
        else:
            continue
    img_count = len(pw_imgs_lowres)
    return render_template(
        "pw.html", 
        pw_imgs = pw_imgs_lowres, 
        row_count = math.ceil(img_count/col_count), 
        active='pw',
        pw_imgs_fullres = pw_imgs_fullres,
        col_count = col_count,
        pw_titles = pw_titles)

@views.route("/about")
def about():
    return render_template("about.html", active='about')